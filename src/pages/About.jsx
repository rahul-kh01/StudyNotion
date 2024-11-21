import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import image1 from "../assets/Images/aboutus1.webp";
import image2 from "../assets/Images/aboutus2.webp";
import image3 from "../assets/Images/aboutus3.webp";
import boxImage1 from "../assets/Images/FoundingStory.png";
import Quote from "../components/AboutPage/Quote";
import StatsComponent from "../components/AboutPage/StatsComponent";
import LearningGrid from "../components/AboutPage/LearningGrid";
import ContactFormSection from "../components/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

export default function About() {
  return (
    <div className="text-richblack-300 ">
      {/* section-1 */}
      <section className=" h-[618px] w-[100vw] bg-richblack-800 py-32 text-center flex flex-col gap-10 items-center ">
        <header className="lg:w-7/12  max-w-maxContent mx-auto flex flex-col gap-8 px-10">
          <h1 className="text-4xl text-richblack-25">
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
          </h1>
          <p>
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
        </header>
        <div className="sm:h-[70px] lg:h-[150px] "></div>
        <div className="absolute -bottom-16 md:-bottom-10 lg:bottom-10 sm:bottom-[10%] min-[1537px]:bottom-[35%]  left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[40%] grid-cols-3 gap-3 lg:gap-5 px-2 justify-items-center">
          <img src={image1} />
          <img src={image2} />
          <img src={image3} />
        </div>
      </section>

      {/* section-2 */}
      <section className="my-36 w-full sm:mt-48 sm:m-36 flex min-[1537px]:justify-center min-[1537px]:w-[85%]">
        <div className="flex max-w-maxContent">
          <Quote />
        </div>
      </section>

      {/* section-3 */}
      <section>
        <div className="flex flex-col w-full md:w-8/12 max-w-maxContent mx-auto  gap-1 ">
          <div className="w-full flex flex-wrap justify-center items-center xl:justify-between gap-12 p-3 ">
            <div className="max-w-[400px] flex flex-col gap-4 border md:border-0 rounded-lg p-6">
              <h1 className="text-pink-400 text-3xl font-bold ">
                Our Founding Story{" "}
              </h1>
              <p>
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p>
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            <div className="max-w-[470px] ">
              <img
                src={boxImage1}
                className="shadow-richblack-600 shadow-xl md:shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap w-full items-center justify-center lg:justify-between mb-20 gap-10 p-5">
            <div className=" sm:w-[45%] max-w-[486px] flex flex-col gap-4 border-t shadow-blue-200 shadow-lg rounded-lg p-6 transform hover:scale-105 transition-all duration-200">
              <h1 className=" text-yellow-200 font-bold text-2xl ">
                Our Vision
              </h1>
              <p>
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className="max-w-[486px] sm:w-[45%] flex flex-col gap-4 border-t shadow-blue-200 shadow-lg rounded-lg p-6 transform hover:scale-105 transition-all duration-200">
              <h1 className=" text-blue-100 font-bold text-2xl ">
                Our Mission
              </h1>
              <p>
                our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section-4 */}
      <StatsComponent />

      {/* section-5 */}
      <LearningGrid />
      <ContactFormSection />

      {/* section-6 */}
      <div className="mb-24 mt-16 text-richblack-25 max-w-maxContent mx-auto">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      {/* section-7 */}
      <Footer />
    </div>
  );
}
