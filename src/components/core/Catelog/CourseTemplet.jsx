import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/AvgRating";
import { getAverageRating } from "../../../services/operations/CatalogPageData";

export default function CourseTemplet({ course, Height }) {
  // console.log(course);
  const [avgRatingCount, setAvgRatingCount] = useState(0);

  useEffect(() => {
    (async function AvgRating() {
      const response = await getAverageRating(course?._id);
      setAvgRatingCount(response.averageRating.toFixed(1));
    })();
    
  }, [course]);
  
  return (
    <div className="w-full flex justify-start  md:justify-center">
      <Link to={`/courses/${course._id}`}>
        <div>
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumbnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />

            <div className="flex flex-col gap-2 px-1 py-3 items-start">
              <p className="text-xl text-richblack-5">{course?.courseName}</p>
              <p className="text-sm text-richblack-50">
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </p>

              <div className="flex items-center gap-2">
                <span className="text-yellow-5">{avgRatingCount!=0?avgRatingCount:0}</span>
                <RatingStars Review_Count={avgRatingCount!=0?avgRatingCount:0} />
                <span className="text-richblack-400">{course?.ratingAndreviews?.length} Ratings</span>
              </div>

              <p className="text-xl text-richblack-5">₹ {course?.price}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
