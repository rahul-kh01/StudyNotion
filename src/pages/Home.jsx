import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningSection from '../components/core/HomePage/LearningSection';
import InstuctorSection from '../components/core/HomePage/InstuctorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';
import '../../src/App.css';
import Footer from '../components/common/Footer';

function Home() {
  return (
    <div>
      {/* SECTION 1 */}
      <div className="relative mx-auto text-white flex flex-col w-11/12 items-center  justify-between mt-20 ">
        <Link to={'/signup'}>
          <div
            className="group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
          transition-all duration-200 hover:scale-95 shadow-sm shadow-richblack-400 hover:shadow-richblack-800"
          >
            <div className="flex items-center gap-3 rounded-full px-8 py-2 group-hover:bg-richblack-900 ">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-8">
          Empower Your Future With <HighlightText text={'Coding Skills'} />
        </div>

        <div className="text-center w-3/6 mt-6 font-semibold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-7 mt-8">
          <CTAButton active={true} linkto={'/signup'}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={'/signup'}>
            Book a Demo
          </CTAButton>
        </div>

        <div className=" my-16 mt-24 relative ">
          <div className=" w-[80%] h-[100%] absolute right-[10%] rounded-full  shadow-2xl shadow-blue-200 bg-blue-200 rotate-180 "></div>
          <video
            width={1000}
            muted
            loop
            autoPlay
            className="relative bottom-1 right-1 sm:bottom-4 sm:right-4 img-shadow"
          >
            <source src={Banner} type="Video/mp4" />
          </video>
          
        </div>

        {/* section code 1 */}
        <div>
          <CodeBlocks
            position={'lg:flex-row'}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={'coding potential '} />
                with our online courses.
              </div>
            }
            subheading={
              'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'
            }
            ctabtn1={{
              active: true,
              linkto: '/signup',
              btnText: 'Try it Yourself',
            }}
            ctabtn2={{
              active: false,
              linkto: '/login',
              btnText: 'Learn More',
            }}
            codeblock={`<!DOCTYPE html>
            <html>
            <head><title>Example</title>
            <linkrel="stylesheet"
            href="styles.css">
            </head>
            <body>
            <h1><ahref="/">Header</a></h1>
            <nav><ahref="one/">One</a>
            <a href="two/">Two</a>
            <ahref="three/">Three</a>
            </nav></body>`}
            backgroundGradient={'bg-yellow-400 '}
            codecolor={'text-yellow-200'}
          />
        </div>

        {/* section code 2 */}
        <div>
          <CodeBlocks
            position={'lg:flex-row-reverse	'}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighlightText text={'coding '} />
                <div>
                  <HighlightText text={'in seconds '} />
                </div>
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              active: true,
              linkto: '/signup',
              btnText: 'Continue Lesson',
            }}
            ctabtn2={{
              active: false,
              linkto: '/login',
              btnText: 'Learn More',
            }}
            codeblock={`<!DOCTYPE html>
            <html>
            <head><title>Example</title>
            <linkrel="stylesheet"
            href="styles.css">
            </head>
            <body>
            <h1><ahref="/">Header</a></h1>
            <nav><ahref="one/">One</a>
            <a href="two/">Two</a>
            <ahref="three/">Three</a>
            </nav></body>`}
            backgroundGradient={'bg-blue-400'}
            codecolor={'text-blue-50'}
          />
        </div>

        <ExploreMore />
      </div>

      {/* SECTION 2 */}
      <div className='bg-white '>

        <div className='homepage-section h-[320px] flex justify-center items-center'>
          <div className='w-11/12 max-w-maxContent flex gap-7 justify-center items-center mx-auto'>
            <CTAButton active={true} linkto={'/signup'} >
              <p className='flex items-center gap-2'>
                Explore Full Catalog
                <FaArrowRight />
              </p>

            </CTAButton>
            <CTAButton active={false} linkto={'/signup'}>
              Learn More
            </CTAButton>
          </div>
        </div>

        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

          <div className='flex flex-col sm:flex-row gap-5 mb-10 mt-[100px] max-[640px]:items-center sm:justify-center '>
            <div className='w-[100%] sm:w-[45%] font-semibold text-4xl '>
              Get the skills you need for a
              <HighlightText text={' job that is in demand.'}/>
            </div>
            <div className='flex flex-col gap-10 sm:w-[40%] items-center sm:items-start '>
              <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
              <CTAButton active={true} linkto={'/signup'}>
              Learn More
              </CTAButton>
            </div>
            <div></div>

          </div>

          <TimeLineSection />
          <LearningSection />
        </div>

      </div>

      {/* SECTION 3 */}
      <div className='w-11/12 mx-auto max-w-maxContent flex-col justify-between gap-8 text-white'>
        <InstuctorSection />
        <div className='my-24'>
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
        </div>
      </div>
      
      {/* SECTION 4 */}
      <Footer />
    </div>
  );
}
export default Home;
