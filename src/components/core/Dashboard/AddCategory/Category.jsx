import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { IoMdAddCircleOutline } from "react-icons/io";
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import IconButton from '../../../common/IconButton'
import { updateCategory, createCategory } from '../../../../services/operations/Category'


export function Category() {
    const { categoryId } = useParams()
    const { token } = useSelector((state) => state.auth)
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)
    const [editCategory, setEditCategory] = useState(categoryId ? categoryId : null)
    const navigate = useNavigate()
    const location = useLocation()
    const category = location.state ? location.state.data : null

    useEffect(() => {

        async function dataTake() {
            if (categoryId) {
                setValue("categoryName", category.name)
                setValue("categoryDesc", category.description)
            } else {
                setValue("categoryName", "")
                setValue("categoryDesc", "")
            }
        }
        dataTake()

    }, [])
    const onSubmit = async (data) => {
        setLoading(true)

        let result

        if (editCategory) {
            result = await updateCategory(
                editCategory,
                data.categoryName,
                data.categoryDesc,
                token
            )
            navigate("/dashboard/all-category")
        } else {
            result = await createCategory(
                {
                    name: data.categoryName,
                    description: data.categoryDesc,
                },
                token
            )
        }
        if (result) {
            setEditCategory(null)
            setValue("categoryName", "")
            setValue("categoryDesc", "")

        }
        setLoading(false)
    }
    const cancelEdit = () => {
        setEditCategory(null)
        setValue("categoryName", "")
        setValue("categoryDesc", "")
        navigate("/dashboard/all-category")

    }
    return (
        <div className=" max-w-[600px] space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">
                {editCategory ? "Edit Category" : "Add Category"}
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col gap-7">
                    <label className="text-sm text-richblack-5 space-y-3" htmlFor="sectionName">
                        Category Name <sup className="text-pink-200">*</sup>
                        <input
                            id="categoryName"
                            disabled={loading}
                            placeholder="Add a category to build your course"
                            {...register("categoryName", { required: true })}
                            className="form-style w-full"
                        />
                        {errors.categoryName && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Category name is required
                            </span>
                        )}
                    </label>

                    <label className="text-sm text-richblack-5 space-y-3" htmlFor="sectionName">
                        Category Description <sup className="text-pink-200">*</sup>
                        <textarea
                            rows={2}
                            cols={10}
                            id="categoryDesc"
                            disabled={loading}
                            placeholder="Add a category description"
                            {...register("categoryDesc", { required: true })}
                            className="form-style w-full"
                        />
                        {errors.categoryDesc && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Category Description is required
                            </span>
                        )}
                    </label>

                </div>
                <div className="flex items-end gap-x-4">
                    <IconButton
                        type="submit"
                        disabled={loading}
                        text={editCategory ? "Edit Category Name" : "Create Category"}
                        outline={true}
                        customClass='row-reverse'
                    >
                        <IoMdAddCircleOutline size={20} className="text-yellow-50" />
                    </IconButton>
                    {editCategory && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="text-sm text-richblack-300 underline"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>
            {/* {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )} */}
            {/* Next Prev Button */}
            {/* <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button> */}
            {/* <IconButton text="Next" onClick={goToNext} customClass='row-reverse'>
          <MdNavigateNext />
        </IconButton> */}
            {/* </div> */}
        </div>
    )
}
