import React from 'react'
import HighlightText from '../core/HomePage/HighlightText'

export default function Quote() {
  return (
    <div className='w-9/12 text-richblack-100 text-3xl sm:text-center mx-auto'>
      <span className='text-richblack-500'>" </span>
      We are passionate about revolutionizing the way we learn. Our innovative platform
      <HighlightText text={" combines technology"} />
      ,
      <span className='text-[#ff8b38]'>{" "}expretise</span>
      , and community to create an
      <span className='text-yellow-50'>{" "}unparalleled educational experience.</span>
      <span className='text-richblack-500'> "</span>
    </div>
  )
}
