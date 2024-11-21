const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const RatingandReview = require("../models/RatingandReview");
const { uploadImageToCloudinary } = require("../utilis/imageUploader");
const { deleteFromCloudinary } = require("../utilis/deleteFile");
const { convertSecondsToDuration } = require("../utilis/secToDuration");
const CourseProgress = require("../models/CourseProgress");
require("dotenv").config();

//update profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, gender, dateOfBirth = "", about = "", contactNumber } = req.body;
    const id = req.user.id;

    const userProfile = await User.findById(id)
    if (firstName) userProfile.firstName = firstName
    if (lastName) userProfile.lastName = lastName
    if (firstName || lastName) await userProfile.save()

    const profileId = userProfile.additionalDetails;
    const profileDetails = await Profile.findById(profileId);


    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    profileDetails.gender = gender;
    await profileDetails.save();


    //return response
    return res.status(200).json({
      success: true,
      message: "profile update successfully",
      profileDetails,
      firstName, lastName
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//delete account
//H.W: how can we schedule this deletion operation

exports.deleteAccount = async (req, res) => {
  try {
    //get id
    const id = req.user.id;
    //user exist?
    const userDetails = await User.findById(id)
      .select("courses accountType additionalDetails")
      .populate({
        path: "courses",
        populate: {
          path: "studentEnrolled",
        },
      });

    //validation
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    if (userDetails.accountType === "instructor" && userDetails.courses.length > 0) {
      userDetails.courses.forEach(course => {
        if (course.studentEnrolled.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Student enrolled in course can't delete account",
          });
        }
      })
    }


    //delete profile
    await Profile.findByIdAndDelete({
      _id: String(userDetails.additionalDetails),
    });
    await CourseProgress.deleteMany({ userId: id });
    await RatingandReview.deleteMany({ user: id });


    //TODO: unenroll user from all courses
    if (userDetails.courses) {
      // console.log(userDetails.courses)
      for (let c of userDetails.courses) {
        await Course.findByIdAndUpdate(
          { _id: c._id },
          { $pull: { studentEnrolled: id } },
          { new: true }
        );
      }
    }


    // await Course.findByIdAndUpdate({})
    //delete user
    const profileImage = userDetails.image;
    await User.findByIdAndDelete({ _id: id });

    if (!profileImage.includes("api.dicebear.com", 0)) {
      deleteFromCloudinary(profileImage, process.env.FOLDER_NAME, "image");
    }


    //return response
    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "User can't be deleted ",
      hint: error.message,
      usr: req.user,
    });
  }
};

//get all user details
exports.getUserAllDetails = async (req, res) => {
  try {
    //get id
    const id = req.user.id;

    //validation & get user details
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    //return response
    return res.status(200).json({
      success: true,
      message: "user data fetched successfully",
      userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

// exports.updateDisplayPicture = async (req, res) => {
// try {
// const displayPicture = req.files.displayPicture
// const userId = req.user.id
// console.log(displayPicture, userId)
// const image = await uploadImageToCloudinary(
// displayPicture,
// process.env.FOLDER_NAME,
// 1000,
// 1000
// )
// console.log(image)
// const updatedProfile = await User.findByIdAndUpdate(
// { _id: userId },
// { image: image.secure_url },
// { new: true }
// )
// res.send({
// success: true,
// message: `Image Updated successfully`,
// data: updatedProfile,
// })
// } catch (error) {
// return res.status(500).json({
// success: false,
// message: error.message,
// })
// }
// };

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSections",
          },
        },
      })
      .exec();
    userDetails = userDetails.toObject();
    var SubsectionLength = 0;

    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;

      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSections.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );
        userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);
        SubsectionLength += userDetails.courses[i].courseContent[j].subSections.length;
      }

      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });


      courseProgressCount = courseProgressCount?.completedVideos.length;
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    // console.log(userDetails.courses, "userDetails.courses" )
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    // console.log(displayPicture);
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      200,
      260
    );
    // console.log(image);
    //previous image delete
    const userDetails = await User.findById(userId);
    if (!userDetails.image.includes("api.dicebear.com", 0)) {
      deleteFromCloudinary(userDetails.image, process.env.FOLDER_NAME, "image");
    }

    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id;

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });
    const courseData = instructorCourses.map((course) => {
      const totalStudents = course.studentEnrolled.length;
      const totalAmount = course.price * totalStudents;
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudents,
        totalAmount,
      };
      return courseDataWithStats;
    });

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      courses: courseData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};
