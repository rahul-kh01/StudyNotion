import React from 'react'
import CourseTemplet from './CourseTemplet'
// import {Swiper, SwiperSlide} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import '../../../components/styles.css';


import {  Autoplay, Navigation, Pagination } from 'swiper/modules'

export default function CourseSlider({ courses }) {
  return (
    <div>
      {
        
        courses?.length ?
          (<Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={200}
            pagination={true}
            modules={[Autoplay, Pagination, Navigation]}
            // className="mySwiper"
            className="max-h-[30rem]"
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            navigation={true}
            // breakpoints={{
            //   1024: { slidesPerView: 3, }
            // }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
          >
            {
              courses.map(( course, index) => (
               
                <SwiperSlide key={index}>
                  <CourseTemplet course={course}  Height={"h-[200px] w-[260px]"} key={index} />
                </SwiperSlide>
              ))
}
          </Swiper>) :
          (<p className="text-xl text-richblack-5">No Courses Found</p>)
      }
    </div>
  )
}
