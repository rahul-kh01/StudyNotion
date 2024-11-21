import React from 'react';
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import leftImage from '../../../assets/Images/TimelineImage.png';
import '../../../App.css';

const timeLine = [
    {
        Logo: logo1,
        heading: 'Leadership',
        desc: 'Fully committed to the success company',
    },
    {
        Logo: logo2,
        heading: "Responsibility",
        desc: 'Students will always be our top priority',
    },
    {
        Logo: logo3,
        heading: 'Flexibility',
        desc: 'The ability to switch is an important skills',
    },
    {
        Logo: logo4,
        heading: 'Solve the problem',
        desc: 'Code your way to a solution',
    },
];
const TimeLineSection = () => {

    return (
        <div>

            <div className="flex flex-col lg:flex-row gap-24 items-center ">

                <div className="lg:w-[45%] w-[80%] flex flex-col gap-5 ">

                    {
                        timeLine.map((data, index) => {
                            return (
                                <div key={index}>
                                    <div className={`${index!=0?"h-12 sm:h-10 w-[15px]  sm:w-[25px] border-r ":""}border-dotted `}></div>
                                    <div className='flex gap-5 ' key={index}>
                                        {/* <div className='h-5 border w-[0%]'></div> */}

                                        <div className='w-[50px] h-[50px] rounded-full shadow-xl shadow-richblack-50 flex items-center justify-center'>
                                            {/* <div className='h-5 border w-[0%]'></div> */}

                                            <img src={data.Logo} />
                                        </div>
                                        
                                        <div className='flex flex-col '>
                                            <h2 className='font-semibold text-[18px]'>{data.heading}</h2>
                                            <p className='text-base'>{data.desc}</p>
                                        </div>
                                    </div>
                                    {/* <div className=' h-5 border w-[0%]'></div> */}

                                </div>
                            )
                        })
                    }
                </div>

                <div className='relative flex flex-col items-center bg-white '>
                    <div className=' w-[100%] h-[35%] sm:h-[50%] absolute z-10 top-[20%] bottom-0 rounded-xl  shadow-2xl shadow-blue-300 bg-blue-300 '></div>

                    <img src={leftImage} alt="" className='relative z-20 img-shadow shadow-black object-cover  ' />
                    <div className='relative  bg-caribbeangreen-700 flex flex-col sm:flex-row  justify-center text-white uppercase px-5 py-7 translate-y-[-50%] z-20 '>
                        <div className='flex gap-5 items-center max-[650px]:border-b sm:border-r border-caribbeangreen-300 px-5 max-[650px]:pb-2'>
                            <p className='text-3xl font-bold'>10</p>
                            <div className='text-caribbeangreen-300 text-sm '>YEARS
                                <p>EXPERIENCES</p> </div>
                        </div>
                        <div className='flex gap-5 items-center px-7 max-[650px]:pt-2'>
                            <p className='text-3xl font-bold'>250</p>
                            <div className='text-caribbeangreen-300 text-sm'>TYPES OF
                                <p>COURSES</p> </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default TimeLineSection;