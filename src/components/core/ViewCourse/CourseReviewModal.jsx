import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import ReactStars from "react-rating-stars-component";
import IconButton from "../../common/IconButton";
import { createRating } from "../../../services/operations/CourseDetailsAPI";
import { useSelector } from "react-redux";

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(()=> {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
},[])

const ratingChanged = (newRating) => {
  setValue("courseRating", newRating);
}

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() =>setReviewModal(false)}>
            <IoClose className="text-2xl text-richblack-5" />
          </button>
        </div>

        <div className="p-2">
          <div className="flex flex-col items-center justify-center gap-y-3">
            <img
              src={user?.image}
              alt={user?.firstName + "profile"}
              className="aspect-square w-[70px] rounded-full object-cover"
            />
            <div className="flex flex-col items-center gap-y-3">
              <p className="font-semibold text-richblack-5 text-2xl">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-5 flex justify-center ">Posting Publicly</p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center gap-3"
            >
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={40}
                activeColor="#ffd700"
                
              />
              <div className="flex w-11/12 flex-col space-y-3 ">
                <label htmlFor="courseExperiences" className="text-sm text-richblack-5 ">
                  Add Your Experience <sup className="text-pink-200">*</sup></label>
                  <textarea
                    name="courseExperiences"
                    id="courseExperiences"
                    cols={40}
                    placeholder="Write your experience here"
                    {...register("courseExperience", { required: true })}
                    className="form-style resize-x-none min-h-[130px] w-full"
                  />
                  {errors.courseExperience && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Please Add Your Experience
                  </span>
                  )}
                
              </div>

              <div className="mt-6 flex w-11/12 justify-end gap-x-2">
                <button 
                onClick={() => setReviewModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >cancel</button>
                <IconButton text="Submit" type="submit" />
              </div>

            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
}
