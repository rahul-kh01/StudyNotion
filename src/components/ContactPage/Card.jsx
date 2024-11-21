import React from 'react'

export default function Card({logo, heading, text1, text2}) {
    return (

        <div className='flex  gap-2 text-richblack-200'>
            <div className='text-lg '>{logo}</div>
            <div>
                <h2 className='text-lg text-richblack-25'>{heading}</h2>
                <p>{text1}</p>
                <p>{text2}</p>
            </div>
        </div>
    )
}
