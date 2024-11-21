import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { getPasswordResetToken } from '../services/operations/authAPI';
import { toast } from "react-hot-toast";
import Loader from "../components/common/Loader"


export default function ForgotPassword() {
    let id;
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

    return (
        <div className='text-white w-full h-[calc(100vh-3.5rem)] flex items-center justify-center '>
            {
                loading ? (<Loader/>) :
                    (
                        <div className='w-full sm:w-[508px] h-[448px] flex flex-col gap-5 p-5 sm:p-16'>
                            <h1 className='font-semibold text-3xl text-richblack-50'>
                                {!emailSent ? "Reset your Password" : "Check your Email"}
                            </h1>
                            <p className='text-richblack-200'>
                                {!emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${{email}}`}
                            </p>
                            <form onSubmit={handleOnSubmit}>
                                {
                                    !emailSent && (
                                        <label>
                                            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 text-base'>Email Address 
                                            <span className='text-pink-600'>*</span></p>
                                            <input
                                                required
                                                type='email'
                                                name='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder='Enter Your Email Address'
                                                style={{
                                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                                  }}
                                                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"                            
                                            />
                                        </label>
                                    )
                                }
                                <button
                                type="submit"
                                className="w-full mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                                >
                                    {
                                        !emailSent ? "Reset Password" : "Resend email"
                                    }
                                </button>
                            </form>
                            <div >
                                <Link to="/login" className='flex gap-3 items-center'>
                                    <FaArrowAltCircleLeft />
                                    <p>Back to login</p>
                                </Link>
                            </div>
                        </div>
                    )
            }

        </div>
    )
}
