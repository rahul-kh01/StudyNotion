import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAdminData } from "../../../../services/operations/authAPI";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import AdminChart from "./AdminChart";
import Loader from "../../../common/Loader";
import { Link } from "react-router-dom";
import { categories } from "../../../../services/apis";


export default function Admin() {
    const [loading, setLoading] = useState(false);
    const [adminData, setAdminData] = useState(null);
    const [users, setUsers] = useState(null);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    useEffect(() => {
        (async function fetchData() {
            setLoading(true);
            const response = await getAdminData(token);
            setUsers(response.instructor + response.students)
            setAdminData(response);
            setLoading(false);
        })();
    }, []);

    
    const totalEarnings = adminData?.categoryData?.reduce(
        (acc, data) => acc + data.income,0
    );
    const totalCourses = adminData?.courses?.length
    // console.log(adminData)
    const totalUsers = adminData?.instructor + adminData?.students

    return (
        <div className="text-white">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-richblack-5">
                    {user?.firstName}
                </h1>
                <p className="font-medium text-richblack-200">
                    Let's start something new
                </p>
            </div>

            {loading ? (
                <div className=" w-full h-[50vh] flex justify-center items-center">
                    <Loader />
                </div>
            ) : categories ? (
                <div>
                    <div className="my-4 flex flex-col gap-10 lg:flex-row lg:h-[500px] ">
                        {totalEarnings > 0 || totalUsers > 0 ? (
                            <AdminChart data={adminData} />
                        ) : (
                            <div className="flex-1 rounded-md bg-richblack-800 p-6">
                                <p className="text-lg font-bold text-richblack-5">Visualize</p>
                                <p className="mt-4 text-xl font-medium text-richblack-50">
                                    Not Enough Data To Visualize
                                </p>
                            </div>
                        )}
                        <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                            <p className="text-lg font-bold text-richblack-5">Statistics</p>
                            <div className="mt-4 space-y-4">
                                <div >
                                    <p className="text-lg text-richblack-200">Total Category</p>
                                    <p className="text-3xl font-semibold text-richblack-50">{adminData?.categoryData?.length}</p>
                                </div>
                                <div >
                                    <p className="text-lg text-richblack-200">Total Course</p>
                                    <p className="text-3xl font-semibold text-richblack-50">{totalCourses}</p>
                                </div>
                                <div>
                                    <p className="text-lg text-richblack-200">Total Instructor</p>
                                    <p className="text-3xl font-semibold text-richblack-50">{adminData?.instructor}</p>
                                </div>
                                <div>
                                    <p className="text-lg text-richblack-200">Total Student</p>
                                    <p className="text-3xl font-semibold text-richblack-50">{adminData?.students}</p>
                                </div>
                                <div>
                                    <p className="text-lg text-richblack-200">Total Income</p>
                                    <p className="text-3xl font-semibold text-richblack-50">₹ {Math.round(totalEarnings * 0.2)}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* <div className="rounded-md bg-richblack-800 p-6">
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-richblack-5">Your Courses</p>
                            <Link to="/dashboard/my-courses">
                                <p className="text-xs font-semibold text-yellow-50">View all</p>
                            </Link>
                        </div>
                        <div className="my-4 flex flex-wrap gap-10 items-start max-md:justify-center ">
                            {courses.slice(0, 3).map((course) => (
                                <div key={course._id}>
                                    <img src={course.thumbnail} alt={course.courseName} className="h-[201px] w-full rounded-md object-cover" />
                                    <div className="mt-3 w-full">
                                        <p className="text-sm font-medium text-richblack-50">{course.courseName}</p>
                                        <div className="mt-1 flex items-center space-x-2">
                                            <p className="text-xs font-medium text-richblack-300">{course.studentEnrolled.length} Students</p>
                                            <p className="text-xs font-medium text-richblack-300"> | </p>
                                            <p className="text-xs font-medium text-richblack-300">Rs {course.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>
            ) : (
                <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
                    <p className="text-center text-2xl font-bold text-richblack-5">You have not created any Category</p>
                    <Link to="/dashboard/addCourse">
                        <p className="mt-1 text-center text-lg font-semibold text-yellow-50">Create a course</p>
                    </Link>
                </div>
            )}
        </div>
    )
}
