import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { fetchCourseCategories } from '../../../../services/operations/CourseDetailsAPI'
import { FiEdit2 } from "react-icons/fi"

import { RiDeleteBin6Line } from "react-icons/ri"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import ConfirmationModal from '../../../common/ConfirmationModel'
import { deleteCategory } from '../../../../services/operations/Category'
import { useNavigate } from 'react-router-dom'

export function Categories() {
    const { token } = useSelector(state => state.auth)

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const navigate = useNavigate()

    // const fetchCourse = 
    useEffect(() => {
        (async () => {
            const result = await fetchCourseCategories(token)
            if (result) setCategories(result)
        })()
    }, [])

    const handleCategoryDelete = async (categoryId) => {
        setLoading(true)
        const res = await deleteCategory(categoryId, token)
        if(res.success)setCategories(categories.filter(category => category._id !== categoryId))
        setConfirmationModal(null)
        setLoading(false)
    }
    const handleEdit = (categoryId) => {
        const category = categories.find(category => category._id === categoryId)
        navigate(`/dashboard/edit-category/${categoryId}`, {state:{data:category}})
    }

    return (
        <div>
            <h2 className='text-richblack-100 text-4xl '>All Categories</h2>
            {
                categories &&
                <Table className="rounded-xl border border-richblack-600  my-10">
                    <Thead>
                        <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-4 bg-richblack-800">
                            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">Categores</Th>
                            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">Description</Th>
                            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">Courses</Th>
                            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">Actions</Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            categories.length === 0 ?
                                (<Tr>
                                    <Td className="py-10 text-center text-2xl font-medium text-richblack-100">No Category Found</Td>
                                </Tr>) : (
                                    categories.map((category, index) => (
                                        <Tr key={category._id} className="border-b border-richblack-800 px-6 py-8 grid grid-cols-4 gap-12 bg-richblack-700">

                                            <Td className="text-sm font-medium text-richblack-100 ">
                                                {category.name}
                                            </Td>
                                            <Td className="text-sm font-medium text-richblack-100">
                                                {category.description.length > 30 ?
                                                    category.description.substring(0, 30) + " ..." :
                                                    category.description}
                                            </Td>
                                            <Td className="text-sm font-medium text-richblack-100">
                                                {category.courses.length}
                                            </Td>
                                            <Td>
                                                <button
                                                    disabled={loading}
                                                    onClick={() => handleEdit(category._id)}
                                                    title="Edit"
                                                    className="text-richblack-25 px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                                >
                                                    <FiEdit2 size={20} />
                                                </button>
                                                <button
                                                    disabled={loading}

                                                    onClick={() => setConfirmationModal({
                                                        text1: "Do you want to delete this category?",
                                                        text2: "All the data related to this category will be deleted",
                                                        btn1Text: !loading ? "Delete" : "Loading...  ",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: () => !loading ? handleCategoryDelete(category._id) : () => { },
                                                        btn2Handler: () => !loading ? setConfirmationModal(null) : () => { }
                                                    })}
                                                    title="Delete"
                                                    className="text-richblack-25 px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                                >
                                                    <RiDeleteBin6Line size={20} />
                                                </button>
                                            </Td>
                                        </Tr>
                                    ))
                                )
                        }
                    </Tbody>
                </Table>
            }
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

        </div>
    )
}

export default Categories
