import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from './RequirementField'
import { setStep, setCourse } from '../../../../../slices/courseSlice'
import IconButton from '../../../../common/IconButton'
import { fetchCourseCategories, addCourseDetailsAPI, editCourseDetailsAPI } from '../../../../../services/operations/CourseDetailsAPI'
import ChipInput from './ChipInput';
import Upload from '../Upload';
import { MdNavigateNext } from "react-icons/md"
import { COURSE_STATUS } from '../../../../../utils/constants'

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const {course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])
  const { token } = useSelector((state) => state.auth)


  const getCategories = async () => {
    setLoading(true)
    const categories = await fetchCourseCategories();
    if (categories.length > 0) {
      setCourseCategories(categories)
    }
    setLoading(false)

  }

  useEffect(() => {
    if (editCourse) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)

    }
    getCategories()

  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDesciption ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenifits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !== course.instructions.toString()||
      currentValues.courseImage !== course.thumbnail
    ) { return true }
    return false
  }

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }

        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnail", data.courseImage);
        }

        if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.courseRequirements));
        }

        setLoading(true);
        const result = await editCourseDetailsAPI(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      }
      else {
        toast("NO Changes made so far");
      }
      // console.log("PRINTING FORMDATA", formData);
      // console.log("PRINTING result", result);

      return;
    }

    //create a new course
    const formData = new FormData();
    console.log(data.courseTags)
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("category", data.courseCategory);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("thumbnail", data.courseImage);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);

    setLoading(true);
    console.log("BEFORE add course API call");
    console.log("PRINTING FORMDATA", formData);
    const result = await addCourseDetailsAPI(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
    console.log("PRINTING FORMDATA", formData);
    console.log("PRINTING result", result);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" w-full space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 "
    >
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">Course Title <sup className="text-pink-200">*</sup></label>
        <input
          type="text"
          id='courseTitle'
          placeholder='Enter course Title'
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (<span className="ml-2 text-xs tracking-wide text-pink-200">Course Title is Required**</span>)}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">Course Short Description <sup className="text-pink-200">*</sup></label>
        <input
          type="text"
          id='courseShortDesc'
          placeholder='Enter Description'
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc &&
          (<span className="ml-2 text-xs tracking-wide text-pink-200">Course Description is Required**</span>)}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">Course Price <sup className="text-pink-200">*</sup></label>
        <div className="relative">
          <input
            id='coursePrice'
            placeholder='Enter course price'
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className='form-style w-full !pl-12'
          />
          <HiOutlineCurrencyRupee className='absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400' />
        </div>
        {errors.coursePrice &&
          (<span className="ml-2 text-xs tracking-wide text-pink-200">Course price is Required**</span>)}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">Course Category<sup className="text-pink-200">*</sup></label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          className="form-style w-full"
        >
          <option value="" disabled >Choose a Category</option>
          {
            !loading && courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))

          }
          {errors.courseCategories &&
            (<span className="ml-2 text-xs tracking-wide text-pink-200">Course Category is required**</span>)}
        </select>
      </div>

      {/* HW: tags input  */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter or ,"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        editCourse={editCourse}
      />

      {/* create a component for uploading and showing preview of media */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benifits of the course
          <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          name="courseBenefits"
          id="courseBenefits"
          placeholder='Enter Benifits of the course'
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        >
          {errors.courseBenifits &&
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Benifits of the course are required**</span>}
        </textarea>
      </div>

      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue without Saving
          </button>
        )}
        <IconButton
          type='submit'
          text={!editCourse ? "Next" : "Save Changes"}
          disabled={loading}
          customClass='row-reverse'
        // onClick={SubmitEvent}
        >
          <MdNavigateNext />
        </IconButton>
      </div>

    </form>
  )
}

export default CourseInformationForm
