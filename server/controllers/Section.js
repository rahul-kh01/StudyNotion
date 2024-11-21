const Course = require("../models/Course")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const User = require("../models/User")


//create Scetion
exports.createSection = async (req, res) => {
    try {
        // data fetch
        const { sectionName, courseId } = req.body

        //validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "missing properties"
            })
        }

        //create section
        const newSection = await Section.create({ sectionName })

        //update course with section object ID
        const updatedCourseDetailsAPI = await Course.findByIdAndUpdate(courseId, { $push: { courseContent: newSection._id } }, { new: true }).populate("courseContent")
        // populate section & subsection both although subsections are not available at now

        //return response
        return res.status(200).json({
            success: true,
            message: "section created sucesssfully",
            updatedCourseDetailsAPI,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "unable to create section, please try again"
        })
    }
}




//update section
exports.updateSection = async (req, res) => {
    try {
        //fetch data inputs
        const { sectionName, sectionId, courseId } = req.body

        //validation
        // if (!sectionName || !Course) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "missing properties"
        //     })
        // }
        //update data
        const updateSection = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true })
        const course = await Course.findByIdAndUpdate(courseId, { courseContent: sectionId }, { new: true })
        .populate({
            path: "courseContent",
            populate: {
                path: "subSections"
            }
        }).exec()
        //return response
        return res.status(200).json({
            success: true,
            message: "section update successfully",
            course
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "unable to update section, please try again"
        })
    }
}



//section delete
exports.deleteSection = async (req, res) => {
    try {
        //get sectionid & courseid
        const { sectionId, courseId } = req.body

        //validation
        if (!sectionId) {
            return res.status(400).json({
                success: false,
                message: "sending sectionId is required"
            })
        }
        const section = await Section.findById(sectionId)
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "section is not found"
            })
        }

        await SubSection.deleteMany({ _id: { $in: section.subSections } })
        await Section.findByIdAndDelete(sectionId)

        const course = await Course.findByIdAndUpdate(courseId, { $pull: { courseContent: sectionId } })
        .populate({
            path: "courseContent",
            populate: {
                path: "subSections"
            }
        }).exec()

        //return response
        return res.status(200).json({
            success: true,
            message: "section delete successfully",
            data: course
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "unable to delete section, please try again" + error.message,
        })
    }
}