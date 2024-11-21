import React, {useRef} from "react";
import { Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFullDetailsOfCourse } from "../services/operations/CourseDetailsAPI";
import {
  setCourseSectionData,
  setCourseEntireData,
  setCompletedLectures,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import {setOpen} from "../slices/profileSlice";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import { FaGreaterThan } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";
import useOnClickOutside from "../hooks/useOnClickOutside";


export default function ViewCourse() {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { open } = useSelector((state) => state.profile);
  const ref = useRef(null);
  const { totalNoOfLectures } = useSelector((state) => state.viewCourse);
  const dispatch = useDispatch();

  useState(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      //   console.log("view course", courseData);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setCourseEntireData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((section) => {
        lectures += section.subSections.length;
      });
      //   console.log(lectures, "lectures")
      dispatch(setTotalNoOfLectures(lectures));
      //   console.log(totalNoOfLectures);
    };
    setCourseSpecificDetails();
  }, []);
  useOnClickOutside(ref, () => dispatch(setOpen(false)));

  return (
    <>
      <div className=" flex min-h-[calc(100vh-3.6rem)] ">
        <div className="relative z-20 flex" ref={ref}>
          <div className="hidden md:block"><VideoDetailsSidebar setReviewModal={setReviewModal} /></div>
          <div className="md:hidden">{open && (<VideoDetailsSidebar setReviewModal={setReviewModal} />)}</div>
          <div className={`text-white relative top-[50%] ${open? "left-[290px] sm:left-[320px]":"left-0"} z-10 w-[18px] h-20 rounded-r-3xl border-r-2 flex justify-end items-center pr-1 md:hidden bg-richblack-800`}
          onClick={()=>dispatch(setOpen(!open))}
          >
            {open ? <FaLessThan />:<FaGreaterThan />}
            {/* <FaGreaterThan /><FaLessThan /> */}
          </div>
        </div>
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="ml-2 mr-6 md:ml-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}
