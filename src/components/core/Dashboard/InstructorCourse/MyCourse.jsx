import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../../services/operations/CourseDetailsAPI'
import IconButton from '../../../common/IconButton'
import { AiOutlinePlus } from "react-icons/ai";
import CourseTable from './CourseTable'

function MyCourse() {
    const { token } = useSelector(state => state.auth)
    const [courses, setCourses] = useState([])
    // const [duration, setDuration] = useState([])
    const navigate = useNavigate()

    const fetchCourse = async () => {
        const result = await fetchInstructorCourses(token)
        if (result) setCourses(result)
    }
    useEffect(() => {fetchCourse()}, [])
    return (
        <div>
            <div className="mb-14 flex items-center justify-between">
                <h1 className="text-3xl font-medium text-richblack-5">My Course</h1>
                <IconButton
                    text="Add Course"
                    onClick={() => navigate('/dashboard/add-course')}
                >
                    <AiOutlinePlus />
                </IconButton>
            </div>
            {courses && <CourseTable courses={courses} setCourses={setCourses} />}  
        </div>
    )
}

export default MyCourse
