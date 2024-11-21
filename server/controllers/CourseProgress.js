
const CourseProgress = require('../models/CourseProgress');
const SubSection = require('../models/SubSection');
const mongoose = require('mongoose');

exports.updateCourseProgress = async (req, res) => {
    try {
        const { courseId, subSectionId } = req.body;
        const userId = req.user.id;


        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({ msg: 'Subsection not found' });
        }

        let courseProgress = await CourseProgress.findOne({courseID:courseId, userId: userId });
        
        if (!courseProgress) {
            return res.status(404).json({success:false,  message: 'Course Progress not found' });
        }
        else{
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({success:false, message: 'Lecture already completed' });
            }
            courseProgress.completedVideos.push(subSectionId);
        }
        
        const ans = await courseProgress.save();
        // console.log(ans)
        return res.status(200).json({success:true, message: 'Course Progress Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: 'Internal Server Error', hint:error.message }); 
    }
}
