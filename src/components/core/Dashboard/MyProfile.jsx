import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconButton from '../../common/IconButton';
import { FaUserEdit } from "react-icons/fa";
import { RiFileEditFill } from "react-icons/ri";
import { formattedDate } from "../../../utils/formattedDate"
export default function MyProfile() {
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate();
    return (

        <div className=' w-full lg:w-[792px] sm:px-10  '>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">My Profile</h1>

            {/* part-1 */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 justify-center items-center sm:justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 sm:p-8 px-5 sm:px-12 ">
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-x-4">
                    <img src={user?.image} className='aspect-square w-[78px] rounded-full object-cover border-2 border-richblack-200' />
                    <div className=" space-y-4 sm:space-y-1">
                        <p className="text-lg font-semibold text-richblack-5">{
                            user?.firstName + " " + user?.lastName}</p>
                        <p className="text-sm text-richblack-300">{
                            user?.email.length > 25 ? user?.email.substring(0, 25) + "..." : user?.email}</p>
                    </div>
                </div>
                <IconButton
                    text="Edit"
                    onClick={() => { navigate("/dashboard/settings") }}
                >
                    <FaUserEdit className='text-richblack-800 text-xl' />
                </IconButton>
            </div>

            {/* part-2 */}
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 sm:p-8 px-7 sm:px-12">
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold text-richblack-5">About</p>
                    <IconButton text="Edit"
                        onClick={() => { navigate("/dashboard/settings") }}>
                        <RiFileEditFill className='text-richblack-800 text-lg' />
                    </IconButton>
                </div>
                <p className={`${user?.additionalDetails?.about
                    ? "text-richblack-5"
                    : "text-richblack-400"
                    } text-sm font-medium`}>{user?.additionalDetails?.about ?? "Write somethinf about yourself"}</p>
            </div>

            {/* part-3 */}
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 sm:p-8 sm:px-12">
                <div className="flex w-full items-center justify-between">

                    <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
                    <IconButton text="Edit"
                        onClick={() => { navigate("/dashboard/settings") }}>
                        <RiFileEditFill className='text-richblack-800 text-lg' />
                    </IconButton>
                </div>
                <div className="flex flex-col gap-5 sm:flex-row max-w-[500px] justify-between ">
                    <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">First Name</p>
                            <p className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.lastName}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Email</p>
                            <p className="text-sm font-medium text-richblack-5">{
                                user?.email.length > 30 ? user?.email.substring(0, 30) + "..." : user?.email}
                            </p>
                        </div>


                    </div>
                    <div className="flex flex-col gap-y-5">

                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Gender</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.additionalDetails?.gender ?? "Add Gender"}
                            </p>
                        </div>

                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                            </p>
                        </div>

                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                                    "Add Date Of Birth"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
