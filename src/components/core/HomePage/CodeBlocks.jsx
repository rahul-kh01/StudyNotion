import CTAButton from './CTAButton';
import { FaArrowRight } from 'react-icons/fa6';
import { TypeAnimation } from 'react-type-animation';

function CodeBlocks({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codecolor,
}) {
  return (
    <div className={` w-11/12 max-w-maxContent  mx-auto flex ${position} sm:flex-row flex-col items-center mb-20  sm:justify-around gap-16 py-10`}>
      {/* section 1 */}
      <div className="sm:w-[35%] w-[95%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 font-bold">{subheading}</div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-3 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* section 2 */}
      <div className={`border-l border-t rounded-lg bg-opacity-5 border-richblack-700 bg-richblack-800  w-[100%] lg:w-[500px] `}>
        <div className={`bg-${codecolor} text-${codecolor} `}></div>
        <div className={`flex text-base py-4 relative`}>
          <div className={` absolute w-[55%] h-[75%] -top-[5%] -left-[5%] bottom-[25%] ${backgroundGradient} bg-opacity-40 rounded-full z-10  shadow-2xl shadow-${backgroundGradient} blur-2xl`}></div>
          <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
          </div>

          <div
            className={`w-[90%] flex flex-col gap-2 font-bold font-mono pr-2 ${codecolor}`}
          >
            <TypeAnimation
              sequence={[codeblock, 1000, '']}
              repeat={Infinity}
              cursor={true}
              style={{
                whiteSpace: 'pre-line',
                display: 'block',
              }}
              omitDeletionAnimation={true}
            ></TypeAnimation>
          </div>

        </div>
      </div>

    </div>
  );
}
export default CodeBlocks;
