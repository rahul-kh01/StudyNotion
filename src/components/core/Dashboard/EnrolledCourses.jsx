import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import Loader from "../../common/Loader";
import { useNavigate } from "react-router-dom";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  
  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      // console.log(response, "EnrolledCourses 16")
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to fetch Enrolled Courses");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
    // console.log(enrolledCourses)
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="text-3xl text-richblack-50">Your Uploads</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <Loader />
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center py-10 text-center text-2xl font-medium text-richblack-100">
          You haven,t enrolled in any course yet
        </p>
      ) : (
        <div className="my-8 text-richblack-5"
        
        >
          <div className="flex rounded-t-lg bg-richblack-500 ">
          <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>




          {enrolledCourses.map((course, index, arr) => (
            <div
              className={`flex items-center  border border-richblack-700 
              ${ index === arr.length - 1 ? "rounded-b-lg" : "rounded-none" }`}
              key={index}
              onClick={() => {
                // console.log(course, "course EnrolledCourses 58");
                navigate(
                  `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/subSection/${course.courseContent?.[0]?.subSections?.[0]?._id}`
                );
              }}
            >
              
              <div
                className="flex flex-col items-start sm:justify-start sm:flex-row w-[45%] cursor-pointer  gap-4 px-5 py-3 "
              >
                <img
                  src={course.thumbnail}
                  alt="courseImage"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>

              <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p className="text-richblack-25">Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
              
            </div>
            
          ))}
          
        </div>
      )}
    </>
  );
}
