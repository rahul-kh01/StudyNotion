import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../components/styles.css";
import { FaStar } from "react-icons/fa"

import { Autoplay, Navigation, Pagination } from "swiper/modules";

import ReactStars from "react-rating-stars-component";
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";

const ReviewSlider = ({ courseId }) => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 20;

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      if (data?.success) {
        setReviews(data?.data);
      }
    })();
  }, []);

  return (
    <div className="text-richblack-50 ">
      <div className="my-[50px] h-[200px]  lg:max-w-maxContent  ">
        <Swiper
          slidesPerView={6}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            400:{
              slidesPerView:2,
            },
            639: {
              slidesPerView: 3,
            },
            865:{
              slidesPerView:4
            },
            1537:{
              slidesPerView:5
            },
            1750:{
              slidesPerView:6
            },
          }}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          modules={[Autoplay, Navigation, Pagination]}
          className="w-full flex justify-center border-richblack-100"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i} className="rounded-lg">
              <div className="flex flex-col items-center gap-3 p-3 text-[14px] text-richblack-25">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14  aspect-square">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      
                      alt="img"
                      className=" rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                    <h2 className="text-[12px] font-medium text-richblack-500">
                      {review?.course?.courseName}
                    </h2>
                  </div>
                </div>

                <p className="font-medium text-richblack-25">
                    {review?.review.length > truncateWords
                      ? `${review?.review
                          .split("")
                          .slice(0, truncateWords)
                          .join("")} ...`
                      : `${review?.review}`}
                  </p>

                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default ReviewSlider;
