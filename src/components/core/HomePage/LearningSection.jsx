import HighlightText from './HighlightText'
import pic1 from '../../../assets/Images/Know_your_progress.png'
import pic2 from '../../../assets/Images/Compare_with_others.png'
import pic3 from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './CTAButton'

function LearningSection() {
   
    return (
        <div className='mt-[50px] max-w-maxContent flex flex-col items-center'>
            <div className='flex flex-col gap-5'>
                <div className='text-4xl font-semibold text-center'>
                    Your swiss knife for
                    <HighlightText text={' learning any language'} />
                </div>
                <div className='text-center text-richblack-600 mx-auto font-medium text-lg w-[65%]'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
            </div>

            <div className='flex flex-col md:flex-row items-center justify-center mt-5'>
                <img src={pic1} alt="" className='object-contain md:-mr-32 ' />
                <img src={pic2} alt="" className='object-contain ' />
                <img src={pic3} alt="" className='object-contain md:-ml-36 ' />

            </div>

            <div className='w-fit mt-6 mb-16'>
                <CTAButton active={true} link={'/signup'} >
                    Learn More
                </CTAButton>
            </div>

        </div>
    )
}
export default LearningSection;