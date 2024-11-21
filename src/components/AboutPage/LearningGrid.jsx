import React from 'react'
import HighlightText from '../core/HomePage/HighlightText';
import CTAButton from '../core/HomePage/CTAButton';


const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];
export default function LearningGrid() {
    return (
        <div className='grid w-10/12 gap-20 lg:gap-0 mx-auto grid-cols-1 lg:grid-cols-4 my-20 sm:p-16 '>
            {
                LearningGridArray.map((card, index) => {
                    return (
                        <div key={index} className={` flex-col gap-10 ${index === 0 && "lg:col-span-2 bg-transparent"}
                        ${card.order & 1 ? "bg-richblack-700" : "bg-richblack-800"}
                        ${card.order === 3 && "lg:col-start-2"}
                        `}>
                            {
                                card.order < 0 ?
                                    (
                                        <div className='flex flex-col items-start gap-5 mx-10'>
                                            <div className='text-3xl'>
                                                {card.heading}
                                                <p>
                                                <HighlightText text={card.highlightText} />

                                                </p>
                                            </div>
                                            <p>{card.description}</p>
                                            <div>
                                                <CTAButton active={true} linkto={card.BtnLink}>{card.BtnText}</CTAButton>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='p-7 flex flex-col gap-5 h-[290px]'>
                                            <h1 className='text-richblack-50 font-semibold text-2xl'>{card.heading}</h1>
                                            <p>{card.description}</p>
                                        </div>
                                    )
                            }
                        </div>
                    )
                })
            }

        </div>
    )
}
