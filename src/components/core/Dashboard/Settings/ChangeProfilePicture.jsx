import React, { useRef, useState, useEffect } from 'react'
import IconButton from '../../../common/IconButton';
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { updateDisplayPicture } from '../../../../services/operations/settingsAPI';

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }


  const handleFileUpload = () => {
    try {
      // console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])

  return (
    <div className="flex items-center justify-center md:justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5 w-full lg:w-[700px] sm:px-10">
      <div className="flex flex-col md:flex-row items-center gap-4 ">
        <img 
        src={previewSource?previewSource : user?.image}
        alt={`profile-${user?.firstName}`} 
        className="aspect-square w-[78px] rounded-full object-cover border-2 border-richblack-200" />

        <div className="space-y-2 flex flex-col md:justify-center items-center md:items-start">
          <p>Change profile picture</p>
          <div className="flex flex-row justify-center gap-3">
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              className='hidden '
              accept='image/png, , image/jpeg, image/jpg, image/gif'
            />
            <button
              onClick={handleClick}
              disabled={loading}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 text-lg"
            >
              select
            </button>
            <IconButton
              text={loading ? "Uploading..." : "Upload"}
              disabled={loading}
              onClick={handleFileUpload}
              customClasses="text-richblack-900"
            >
              {
                !loading && (<FiUpload className='text-lg text-richblack-900' />)
              }
            </IconButton>
          </div>
        </div>

      </div>
    </div>
  )
}
