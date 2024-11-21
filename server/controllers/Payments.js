const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const { mailSender } = require("../utilis/mailSender");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");
const {paymentSuccessEmail}  = require("../mail/template/paymentSuccessEmail")
const {courseEnrollmentEmail}  = require("../mail/template/courseEnrollmentEmail")
//for multiple item

//initiate capture payment
exports.capturePayment = async (req, res) => {
  try {
    //get courseId, userId from req body
    const { courses } = req.body;
    const UserId = req.user.id;
    // console.log(courses, "courses");
    if (courses.length === 0) {
      return res.json({
        success: false,
        message: "please provide course Id",
      });
    }

    let totalAmount = 0;
    for (const course_id of courses) {
      let course;
      try {
        course = await Course.findById(course_id);
        if (!course) {
          return res.status(200).json({
            success: false,
            message: "couldn't find the course",
          });
        }
        const uid = new mongoose.Types.ObjectId(UserId);
        if (course.studentEnrolled.includes(uid)) {
          return res.status(200).json({
            success: false,
            message: "student is already enrolled in the course",
          });
        }

        totalAmount += course.price;
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
    const currency = "INR";
    const options = {
      amount: totalAmount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
    };

    try {
      const paymentResponse = await instance.orders.create(options);
      return res.status(200).json({
        success: true,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
        message: paymentResponse,
      });
    } catch (error) {
      // console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//verify signature
exports.verifyPayment = async (req, res) => {
  try {
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_signature = req.body?.razorpay_signature;

    const courses = req.body.courses;
    const UserId = req.user.id;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res
        .status(300)
        .json({ success: false, message: "Payment Failed" });
    }

    // generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, secret);
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (generated_signature == razorpay_signature) {
      //payment is successful && enroll students
      await enrollStudent(courses, UserId, res);

      //return response
      return res
        .status(200)
        .json({ success: true, message: "Payment successful" });
    }
    return res.status(300).json({ success: false, message: "Payment Failed" });
  } catch (error) {
    console.log(error, "verify payment");
  }
};

//enrollStudents
const enrollStudent = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(300)
      .json({
        success: false,
        message: "please provide data for courses or userId",
      });
  }

  for (const courseId of courses) {
    try {
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        { $push: { studentEnrolled: userId } },
        { new: true }
      );
      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, message: "Course Not Found" });
      }

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });

      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        { $push: { courses: courseId, courseProgress: courseProgress._id } },
        { new: true }
      );
      if (!enrolledStudent) {
        return res
          .status(500)
          .json({
            success: false,
            message: "please provide data for courses or userId",
          });
      }

      await mailSender(
        enrolledStudent.email,
        `Enrolled in ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          `${enrolledCourse.courseName}`
        )
      );
      // console.log("enroll student")
    } catch (error) {
      console.log(error, "payment.js enrollstudent 148");
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

exports.sendPaymentSuccessfullEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the fields" });
  }
  try {
    const enrolledStudent = await User.findById(userId);
    await mailSender(
      enrolledStudent.email,
      "Payment Received",
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        `${amount/100}`,
        `${orderId}`,
        `${paymentId}`,
      )

    );
    // console.log("mail send")
  } catch (error) {
    console.log("Error in sending mail for payment");
    return res
      .status(500)
      .json({ success: false, message: "couldn,t send the mail" });
  }
};

//for single item

//capture the payment
// exports.capturePayment = async (req, res) => {
//     try {
//         //get courseId, userId from req body
//         const { course_id } = req.body
//         const UserId = req.user.id

//         //valid courseid
//         if (!course_id) {
//             return res.status(400).json({
//                 success: false,
//                 message: "please provide valid course id",
//             })
//         }

//         //valid course details
//         const course = await Course.findById(course_id)
//         if (!course) {
//             return res.status(404).json({
//                 success: false,
//                 message: "couldn't find the course",
//             })
//         }

//         //user already have the same course
//         const uid = new mongoose.Types.ObjectId(UserId)
//         if (course.studentEnrolled.includes(uid)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User already have this course",
//             })
//         }

//         //order create
//         const amount = course.price
//         const currency = "INR"
//         const options = {
//             amount: amount * 100,
//             currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes: {
//                 courseId: course_id,
//                 UserId,
//             }
//         }

//         const paymentResponse = await instance.orders.create(options)
//         console.log(paymentResponse)
//         return res.status(200).json({
//             success: true,
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount,
//         })

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         })
//     }
// }

//verify signature
// exports.verifySignature = async (req, res) => {
//     try {
//         const webhookSecret = "12345678"

//         const signature = req.headers("x-razorpay-signature")

//         const shasum = crypto.createHmac("sha256", webhookSecret)
//         shasum.update(JSON.stringify(req.body))
//         const digest = shasum.digest("hex")

//         if (signature === digest) {
//             console.log("payment Authorized")
//             const { courseId, UserId } = req.body.payload.payment.entity.notes

//             //fullfill the action

//             //find the course and enroll in it
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 { _id: courseId },
//                 { $push: { studentEnrolled: UserId } },
//                 { new: true },
//             )

//             if (!enrolledCourse) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "Course not found",
//                 })
//             }
//             console.log(enrolledCourse)

//             //find the student and update courses
//             const enrolledStudent = await User.findOneAndUpdate(
//                 { _id: UserId },
//                 { $push: { courses: courseId } },
//                 { new: true },
//             )
//             console.log(enrolledStudent)

//             //confirmation mail send
//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congratulation for enrolling in course",
//                 "You are enrolled in a course"
//             )

//             console.log(emailResponse)

//             return res.status(200).json({
//                 success: true,
//                 message: "signature verified and course added",
//             })
//         } else {
//             return res.status(400).json({
//                 success: false,
//                 message: "invalide reqest",
//             })
//         }
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         })
//     }
// }
