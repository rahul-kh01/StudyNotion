import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Loader from '../components/common/Loader'
import { RxCountdownTimer } from "react-icons/rx";


export default function VerifyEmail() {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { signupData, loading } = useSelector((state) => state.auth);
    useEffect(() => {
        if(!signupData){
            navigate("/signup");
        }
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            secretKey
        } = signupData;
        dispatch(signUp(firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
            secretKey,
            navigate
        ));
    }
    return (
        <div className='text-white h-[calc(100vh-3.6rem)] flex justify-center items-center'>
            {
                loading ? (<Loader />) :
                    (
                        <div className='w-full sm:w-[508px] h-[370px] flex flex-col gap-6 p-5 sm:p-4 lg:p-8'>
                            <h1 className='font-semibold text-3xl text-richblack-5'>Verify email</h1>
                            <p className='text-richblack-100 text-[1.125rem] leading-[1.625rem] my-4'>A verification code has been sent to you. Enter the code below</p>
                            <form onSubmit={handleSubmit} className=''>
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>{"  "}</span>}
                                    renderInput={(props) => <input {...props}
                                        placeholder='-'
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-[40px] sm:w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50" />}
                                    containerStyle={{
                                        justifyContent: "space-between",
                                        gap: "0 2px",
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="w-full mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                                >Verify email</button>
                            </form>
                            <div className='mt-6 flex items-center justify-between p-2 sm:p-0'>
                                <div>
                                    <Link to="/login" className='text-richblack-5 flex items-center gap-x-2'>
                                        <FaArrowAltCircleLeft />
                                        <p>Back to login</p>
                                    </Link>
                                </div>
                                <div
                                    className='text-blue-100 cursor-pointer flex items-center gap-2'
                                    onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
                                    <RxCountdownTimer />
                                    Resend it
                                </div>
                            </div>

                        </div>
                    )
            }
        </div>
    )
}
