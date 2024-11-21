import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "../../common/IconButton";
import { BsChevronDown } from "react-icons/bs"
import {setOpen} from "../../../slices/profileSlice";


export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { open } = useSelector((state) => state.profile);
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
        // console.log(subSectionId, "courseSectionData")
      if (!courseSectionData.length) return;
      const activeSectionIndex = courseSectionData.findIndex(
        (section) => section._id === sectionId
      );

      const activeSubSectionIndex = courseSectionData?.[
        activeSectionIndex
      ]?.subSections.findIndex((subSection) => subSection._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[activeSectionIndex]?.subSections?.[
          activeSubSectionIndex
        ]?._id;
        // console.log(courseSectionData[0], activeSectionIndex)
      setActiveStatus(courseSectionData?.[activeSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);


  return (
    <>
      <div  className="flex h-[calc(100vh-3.5rem)] w-[290px] sm:w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 overflow-y-hidden absolute md:relative">
        {/* for buttons and heading */}
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            <div 
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
            title="back"
            >
              <IoIosArrowBack />
            </div>
           
              <IconButton text={"Add Review"} onClick={()=>setReviewModal(true)} customClasses="ml-auto"/>
            
          </div>

          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
                {/* {console.log(completedLectures?.length, "completedLectures")} */}
              {completedLectures.length}/{totalNoOfLectures}
            </p>
          </div>

        </div>

        {/* for section and subsection */}
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => {activeStatus!=course?._id? setActiveStatus(course?._id):setActiveStatus("") }}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-medium">
                    Lesson {course?.subSections.length}
                  </span>
                  <span
                    className={`${
                      activeStatus === course?._id
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course.subSections.map((topic, i) => (
                    <div
                      className={`flex gap-3  px-5 py-2 ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                      } `}
                      key={i}
                      onClick={() => {
                        dispatch(setOpen(!open))
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/subSection/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>


      </div>
    </>
  )
}
