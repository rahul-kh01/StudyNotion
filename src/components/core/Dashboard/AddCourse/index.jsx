import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <div >
       <div className="flex flex-col lg:flex-row w-full  items-center justify-evenly lg:items-start gap-10 relative">
        <div className="flex flex-col mb-10">
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
              Add Course</h1>
            <div className="flex border-2">
                <RenderSteps />
            </div>
        </div>
        <div className="md:sticky top-10  max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6  ">
            <p className="mb-8 text-lg text-richblack-5">⚡ Course Upload Tips</p>
            <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>
            </ul>
        </div>
       </div>
    </div>
  )
}

export default AddCourse
