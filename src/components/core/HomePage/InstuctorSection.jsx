import InstructorImage from '../../../assets/Images/Instructor.png'
import { FaArrowRight } from 'react-icons/fa6';
import CTAButton from './CTAButton';
import HighlightText from './HighlightText';
import '../../../App.css';

function InstructorSection() {

    return (
        <div className="w-11/12 mt-16 mx-auto max-w-maxContent ">
            <div className="flex flex-col-reverse sm:flex-row gap-20 items-center justify-center">
            <div className='w-fit sm:hidden sm:h-0 '>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex gap-2 items-center'>
                                Start Teaching Today
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                <div className='w-[80%] md:w-[50%] teacher-shadow '>
                
                    <img src={InstructorImage} alt="" className=' shadow-white ' />
                </div>
                
                <div className='w-[90%] md:w-[50%] flex flex-col gap-5'>
                    <div className='text-4xl font-semibold w-[50%]'>
                        Become an
                        <HighlightText text={' instructor'} />
                    </div>
                    <p className='font-medium text-[15px] w-[80%] text-richblack-300 mb-10'>
                        nstructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>
                    <div className='w-fit max-[639px]:hidden max-[639px]:h-0'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex gap-2 items-center'>
                                Start Teaching Today
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>

                </div>

            </div>

        </div>
    )
}
export default InstructorSection;