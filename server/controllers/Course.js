const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const { uploadImageToCloudinary } = require("../utilis/imageUploader");
// const { CourseProgress } = require('../models/CourseProgress')
const { deleteFromCloudinary } = require("../utilis/deleteFile");
require("dotenv").config();

//create course
exports.createCourse = async (req, res) => {
  try {
    //fetch data
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status,
      instructions: _instructions,
    } = req.body;

    //fetch file
    const thumbnail = req.files.thumbnail;
    // console.log(thumbnail)
    const tag = JSON.parse(_tag);
    const instructions = JSON.parse(_instructions);

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail ||
      !tag.length ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (!status || status === undefined) {
      status = "Draft";
    }

    //check for instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById({ _id: userId });
    // check user.id ===instructorDetails._id?

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "instructor details not found",
      });
    }
    //problem are
    // check given tag vaid or not
    const categoryDetails = await Category.findById({ _id: category });

    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category details not found",
      });
    }

    //upload image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME,
      200,
      260
    );

    //create DB entry for Course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag,
      thumbnail: thumbnailImage.secure_url,
      category: categoryDetails._id,
      status,
      instructions,
    });

    //add new course to user schema of instructor(User)
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    //update tag schema
    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    //return response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong while creating course",
      error: error.message,
    });
  }
};

//get all course
exports.getAllCourses = async (req, res) => {
  try {
    //fetch data from DB
    /*
                const allCourses = await Course.find({}, {courseName: true,
                                                            price: true,
                                                            thumbnail: true,
                                                            instructor: true,
                                                            ratingAndReviews: true,
                                                            studentEnrolled: true,
                                                        }).populate("instructor").exec()
        */

    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnroled: true,
      }
    )
      .populate("instructor")
      .exec();

    //return response
    return res.status(200).json({
      success: true,
      message: "all courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "can't fetch couse data",
      error: error.message,
    });
  }
};

//getCourseDetailsAPI
exports.getCourseDetailsAPI = async (req, res) => {
  try {
    //get id
    const { courseId } = req.body;

    //find course details
    const CourseDetailsAPI = await Course.findById({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("ratingAndreviews")
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();

    if (!CourseDetailsAPI) {
      return res.status(404).json({
        success: false,
        message: `could not find the course with id: ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: " course detailes fetched successfully",
      data: CourseDetailsAPI,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      // console.log("thumbnail update");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;

      // Delete the old thumbnail from Cloudinary
      deleteFromCloudinary(course.thumbnail, process.env.FOLDER_NAME, "image");
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndreviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getFullCourseDetailsAPI = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const courseDetails = await Course.findById({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndreviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();
    // console.log(CourseDetailsAPI)

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });
    // console.log(courseProgressCount)

    // console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    // let totalDurationInSeconds = 0
    // courseDetails.courseContent.forEach((content) => {
    //     content.subSections.forEach((subSection) => {
    //         const timeDurationInSeconds = parseInt(subSection.timeDuration)
    //         totalDurationInSeconds += timeDurationInSeconds
    //     })
    // })

    // const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        // totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id;

    // Find all courses belonging to the instructor
    let instructorCourses = await Course.find({
      instructor: instructorId,

    }).sort({ createdAt: -1 }).populate({path:"courseContent", populate:{path:"subSections"}}).exec();

    // instructorCourses = instructorCourses.toObject()
    let courses = []
    instructorCourses.map(course=>{
      let time=0;
      time+=course.courseContent.reduce((acc,section)=>{
        return acc+section.subSections.reduce((acc,subSection)=>{
          return acc+ Number(subSection.timeDuration);
        },0)
      },0)
      course = course.toObject();
      course.timeDuration = time;
      courses.push(course)
      
    })
    // console.log(courses)
    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};
// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Find the course
    const course = await Course.findById({ _id: courseId }).populate({
      path: "courseContent",
      populate: {
        path: "subSections",
      },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    deleteFromCloudinary(course.thumbnail, process.env.FOLDER_NAME, "image");

    const studentsEnrolled = course.studentEnrolled;
    if (studentsEnrolled.length > 0) {
      return res.status(300).json({
        success: false,
        message: "Students Enrolled course Can't Delete",
      });
    }

    //unenrolled students
    // for (const studentId of studentsEnrolled) {
    //   await User.findByIdAndUpdate(studentId, {
    //     $pull: { courses: courseId },
    //   });
    // }

    // Delete sections and sub-sections
    const courseSections = course.courseContent;
    for (const section of courseSections) {
      //delete sub-section
      const subSections = section.subSections;
      for (const subSection of subSections) {
        deleteFromCloudinary(
          subSection.videoURL,
          process.env.FOLDER_NAME,
          "video"
        );
        await SubSection.findByIdAndDelete(subSection._id);
      }

      // Delete the section
      await Section.findByIdAndDelete(section._id);
    }

    // Delete the course
    await Course.findByIdAndDelete({ _id: courseId });

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
