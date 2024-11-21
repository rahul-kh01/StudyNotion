import React from 'react'
import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
import { useSelector } from 'react-redux'


export default function Settings() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className='my-14'>
      <h1 className=" mb-14 text-3xl font-medium text-richblack-5  ">Edit Profile</h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />


      {/* Profile */}
      <EditProfile />


      {/* Password */}
      <UpdatePassword />


      {/* Delete Account */}
      {user.accountType !== "admin" && <DeleteAccount />}
    </div>
  )
}
