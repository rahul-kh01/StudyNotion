import React from 'react'
const stats = [
    { count: "5k", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" }
]
export default function StatsComponent() {
    return (
        <div className='w-full bg-richblack-800 p-10 sm:p-5  flex justify-center items-center'>
            <div className='flex w-[800px] flex-wrap gap-10 max-w-maxContent mx-auto justify-center md:justify-between items-center '>
                {
                    stats.map((data, index) => {
                        return (
                            <div key={index} className='min-w-[150px] flex flex-col items-center text-center gap-2 sm:py-8'>
                                <div className='text-richblack-25 text-3xl font-extrabold'>{data.count}</div>
                                <p className='text-base'>{data.label}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
