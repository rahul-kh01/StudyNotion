// const Course = require("../models/Course")
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const {uploadImageToCloudinary} = require("../utilis/imageUploader");
require("dotenv").config();

const { deleteFromCloudinary } = require("../utilis/deleteFile");
//create subsection
exports.createSubsection = async (req, res) => {
  try {
    //fetch data from req body
    const { sectionId, title, timeDuration, description } = req.body;

    //extract file
    const video = req.files.video;

    //validation
    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "missing properties",
      });
    }
    //upload to cloudinary

    const videoLink = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    // console.log(videoLink)

    const time = videoLink.duration;
    // console.log(time);

    //create a sub section
    const newSubsection = await SubSection.create({
      title: title,
      timeDuration: time,
      description: description,
      videoURL: videoLink.secure_url,
    });
    //update section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSections: newSubsection._id } },
      { new: true }
    )
      .populate("subSections")
      .exec();
    //here populte is HW

    // console.log(updatedSection)

    //return response
    return res.status(200).json({
      success: true,
      message: "Subsection created sucesssfully",
      updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "unable to create Subsection, please try again",
      hint: error.message,
    });
  }
};

//update subsection
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, description } = req.body;

    const subSection = await SubSection.findById({ _id: subSectionId });

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoURL = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;

      //delete the previous video
      deleteFromCloudinary(
        subSection.videoURL,
        process.env.FOLDER_NAME,
        "video"
      );
    }

    await subSection.save();

    return res.json({
      success: true,
      message: "Section updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    });
  }
};

//delete subsection
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    const subsdesctionDetails = await SubSection.findById(subSectionId);
    deleteFromCloudinary(
      subsdesctionDetails.videoURL,
      process.env.FOLDER_NAME,
      "video"
    );

    const subSection = await SubSection.findByIdAndDelete(
      { _id: subSectionId },
      { new: true }
    );

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSections: subSectionId,
        },
      }
    )
      .populate("subSections")
      .exec();

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
      hint: error.message,
    });
  }
};
