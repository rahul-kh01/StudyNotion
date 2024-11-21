import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { markLectureAsComplete } from "../../../services/operations/CourseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { FaRegCirclePlay } from "react-icons/fa6";
import { Player, BigPlayButton } from "video-react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "video-react/dist/video-react.css";
import IconButton from "../../common/IconButton";
// import { useRef } from "react";

export default function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData, courseSectionData, completedLectures } = useSelector(
    (state) => state.viewCourse
  );

  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      // console.log(completedLectures, "completedLectures")
      if (!courseSectionData.length) return;
      if (!courseId || !sectionId || !subSectionId)
        navigate("/dashboard/enrolled-courses");
      else {
        const filteredData = courseSectionData.filter(
          (section) => section._id === sectionId
        );
        const filteredVideoData = filteredData[0].subSections.filter(
          (subSection) => subSection._id === subSectionId
        );
        // console.log(filteredVideoData)
        setVideoData(filteredVideoData[0]);
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false);
      }
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    //subsectionid
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSections.findIndex((data) => data._id === subSectionId);
    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) return true;
    else return false;
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSections.length;
    //subsectionid
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSections.findIndex((data) => data._id === subSectionId);
    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    )
      return true;
    else return false;
  };
  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSections.length;
    //subsectionid
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSections.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSections[
          currentSubSectionIndex + 1
        ]._id;
      // if(currentSectionIndex === courseSectionData.length-1) return;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/subSection/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      // if(currentSectionIndex === courseSectionData.length-1) return;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSections[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/subSection/${nextSubSectionId}`
      );
    }
  };
  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSections.length;
    //subsectionid
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSections.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSections[
          currentSubSectionIndex - 1
        ]._id;
      // if(currentSectionIndex === courseSectionData.length-1) return;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/subSection/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      // if(currentSectionIndex === courseSectionData.length-1) return;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSections.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSections[
          prevSubSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/subSection/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    //course progress pending
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
    console.log(completedLectures)
  };

  return (
    <div className="flex flex-col gap-5 text-white max-md:mt-5 ">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoURL}
          className="border border-richblack-700 rounded-lg shadow-lg shadow-richblack-500"
        > 
            <BigPlayButton position="center" />
          {videoEnded && (
                <div 
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                }}
                className="full absolute inset-0 z-10 grid h-full place-content-center font-inter"
              >
                    {
                        !completedLectures.includes(subSectionId) && (
                        <IconButton 
                        disabled={loading}
                        onClick={()=>handleLectureCompletion()}
                        text={!loading?"Mark as Completed":"Loading..."}
                        customClasses="text-xl max-w-max px-4 mx-auto"
                        />)
                    }
                    <IconButton 
                    disabled={loading}
                    onClick={()=>{
                        if(playerRef?.current){
                            playerRef.current?.seek(0);
                            playerRef.current?.play();
                            setVideoEnded(false);
                        }
                    }}
                    text="Rewatch"
                    customClasses="text-xl max-w-max px-4 mx-auto mt-2 text-richblack-500"
                    />
                    <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                        {!isFirstVideo() && (
                            <button disabled={loading} onClick={goToPreviousVideo} className="blackButton  flex items-center">
                                <FaAngleLeft /> <span> Prev</span>
                            </button>
                        )}
                        {!isLastVideo() && (
                            <button disabled={loading} onClick={goToNextVideo} className="blackButton flex items-center">
                                 <span>Next </span> <FaAngleRight />

                            </button>
                        )}
                    </div>
                </div>
            )
          }
        </Player>
      )}
      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
}
