import { useState } from "react";
import { HomePageExplorer } from '../../../data/homepage-explore';
import HighlightText from "./HighlightText";
import Card from "../HomePage/Card";

const tabName = ['Free', 'New to coding', 'Most popular', 'Skills paths', 'Career paths'];
function ExploreMore() {
    const [currentTab, setCurrentTab] = useState(tabName[0]);
    const [courses, setCourses] = useState(HomePageExplorer[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplorer[0].courses[0].heading);

    const setMyCard = (value) => {

        setCurrentTab(value);
        const newCourse = HomePageExplorer.filter((course) => course.tag === value);
        setCourses(newCourse[0].courses);
        setCurrentCard(newCourse[0].courses[0].heading);
    }

    return (
        <div className="relative w-full max-w-maxContent flex flex-col items-center mt-12">

            <div className="text-4xl font-semibold text-center">
                Unlock the
                <HighlightText text={' Power of Code'} />
            </div>

            <p className="text-center text-richblack-300 text-sm text-[16px] mt-3">
                Learn to Build Anything You Can Imagine
            </p>

            <div className=" max-[639px]:w-[100%] mx-auto mt-5 flex rounded-full bg-richblack-800 mb-28 border-richblack-100 px-2 py-2 overflow-x-auto">
                {
                    tabName.map((tab, index) => {
                        return (
                            <div className={`text-[16px] flex items-center gap-2 min-w-fit
                            ${currentTab === tab ?
                                    "bg-richblack-900 text-richblack-5 font-medium" :
                                    "text-richblack-200"}
                            rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2
                            `}
                                key={index}
                                onClick={() => setMyCard(tab)}>
                                {tab}
                            </div>
                        )
                    })
                }
            </div>

            <div className="h-[900px] md:h-[600px] xl:h-[200px]  w-full relative flex justify-center ">

                <div className=" max-w-maxContent flex gap-10 justify-center flex-wrap absolute top-[0%]">
                    {/* todo card component */}
                    {
                        courses.map((course, index) => {
                            return (
                                <div
                                    key={index}
                                    className="w-[341px] flex flex-col  ">
                                    <Card tag={course.heading} desc={course.description} level={course.level} lessionNumber={course.lessionNumber} activate={setCurrentCard} course={currentCard} />

                                </div>
                            )
                        })
                    }

                </div>

            </div>

        </div>
    )
}
export default ExploreMore