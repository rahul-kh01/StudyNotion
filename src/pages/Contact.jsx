import React from "react";
import ContactUsForm from "../components/common/ContactUsForm";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import Footer from "../components/common/Footer";
import Card from "../components/ContactPage/Card";
import ReviewSlider from "../components/common/ReviewSlider";
const cardData = [
  {
    logo: <HiChatBubbleLeftRight />,
    heading: "Chat on us",
    text1: "Our friendly team is here to help.",
    text2: "@mail address",
  },
  {
    logo: <BsGlobeCentralSouthAsia />,
    heading: "Visit us",
    text1: "Come and say hello at our office HQ.",
    text2: "Here is the location/ address",
  },
  {
    logo: <FaPhone />,
    heading: "Call us",
    text1: "Mon - Fri From 8am to 5pm",
    text2: "+123 456 7890",
  },
];
export default function Contact() {
  return (
    <>
      <div className="w-11/12 mx-auto text-white my-20 ">
        {/* section-1 */}
        <div className="flex flex-wrap gap-10 justify-evenly">
          <div className="h-[450px] sm:h-[390px] min-h-fit w-full sm:w-[450px] bg-richblack-800 rounded-lg flex flex-col justify-center px-14 gap-8 sm:gap-10">
            {cardData.map((data, index) => {
              return (
                <Card
                  key={index}
                  logo={data.logo}
                  heading={data.heading}
                  text1={data.text1}
                  text2={data.text2}
                />
              );
            })}
          </div>
          <div className="w-[600px] border-richblack-600 border p-5 sm:p-10 rounded-xl">
            <p className="font-bold text-richblack-25 text-3xl mb-5">
              Got a Idea? We’ve got the skills. Let’s team up
            </p>
            <p className="text-richblack-300">
              Tall us more about yourself and what you’re got in mind.
            </p>
            <ContactUsForm />
          </div>
        </div>

        {/* section-2  */}
        <div className="mb-24 mt-16 text-richblack-25 max-w-maxContent mx-auto">
          <h1 className="text-center text-4xl font-semibold mt-8">
            Reviews from other learners
          </h1>
          <ReviewSlider />
        </div>
        
      </div>
      {/* section3 */}
      <Footer />
    </>
  );
}
