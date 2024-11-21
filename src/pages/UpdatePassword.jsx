import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { resetPassword } from '../services/operations/authAPI';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Loader from "../components/common/Loader"


export default function UpdatePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const handleChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        ));
    }
    const { password, confirmPassword } = formData;

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token, navigate));
    }
    return (
        <div className='text-white h-[calc(100vh-3.5rem)] flex justify-center items-center'>
            {
                loading ? (<Loader />) :
                    (<div className='w-full sm:w-[500px] h-[586px] flex flex-col gap-5 p-5 sm:p-16'>
                        <h1 className='font-semibold text-3xl text-richblack-50'>Choose new password</h1>
                        <p className='text-richblack-200'>Almost done. Enter your new password and youre all set.</p>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
                            <label className='relative'>
                                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>New password <span className='text-pink-600'>*</span></p>
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                />
                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-[50%] z-[10] cursor-pointer"
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </span>
                            </label>
                            <label className="relative ">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    Confirm Password <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                />
                                <span
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-[50%] z-[10] cursor-pointer"
                                >
                                    {showConfirmPassword ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </span>
                            </label>
                            <button
                                type="submit"
                                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                            >
                                Reset Password
                            </button>
                        </form>

                        <div>
                            <Link to="/login" className='flex gap-2 items-center'>
                                <FaArrowAltCircleLeft />
                                <p>Back to login</p>
                            </Link>
                        </div>
                    </div>)
            }
        </div>
    )
}
