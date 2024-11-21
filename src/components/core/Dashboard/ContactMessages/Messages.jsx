import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton'
import { MdOutlinePendingActions } from "react-icons/md";
import { getAllMessages } from '../../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';


export function Messages() {
    const { token } = useSelector((state) => state.auth);
    const [allMessages, setAllMessages] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchMessages() {
            const Messages = await getAllMessages(token);
            setAllMessages(Messages)
        }
        fetchMessages()
    }, [])
    const solveMessage = (message) => {
        navigate(`/dashboard/message/${message._id}`,
            {
                state: {
                    firstName: message.firstName,
                    lastName: message.lastName,
                    email: message.email,
                    message: message.message,
                    phoneNo: message.contactNumber.phoneNo,
                    countryCode: message.contactNumber.countrycode,
                    _id: message._id
                }
            })
    }
    return (
        <div className=' w-full lg:w-[900px] md::px-10  '>
            <h1 className="mt-5 text-3xl font-medium text-richblack-5">All Messages</h1>
            <div className='w-full my-12 sm:px-6 md:px-8 lg:px-10 flex flex-col gap-14 '>
                {
                    !allMessages.length ?
                        <div className='text-richblack-100 text-center p-10 bg-richblack-800 text-4xl rounded-3xl border border-richblack-100'>
                            No Messages Yet
                        </div>
                        :
                        allMessages.map((message, index) => (
                            <div key={index} className='bg-richblack-800 p-5 rounded-xl border border-richblack-500 flex flex-col gap-5'>
                                <div className='text-richblack-200 flex justify-between '>
                                    <div className='text-md font-semibold'>
                                        <p>{message.firstName} {message.lastName}</p>
                                        <p>{message.email.length > 27 ?
                                            message.email.slice(0, 27) + "..." :
                                            message.email}
                                        </p>
                                    </div>
                                    <div className='transition-all duration-1000 hidden sm:block'>
                                        <IconButton
                                            text="pending"
                                            customClasses='hover:scale-90  hover:text-richblack-500'
                                            onClick={() => solveMessage(message)}
                                            children={<MdOutlinePendingActions />}
                                        />
                                    </div>
                                </div>
                                <p className='text-richblack-100'>
                                    {message.message.length > 40 ? message.message.slice(0, 40) + '...' : message.message}
                                </p>
                                <div className='transition-all duration-1000 sm:hidden'>
                                    <IconButton
                                        text="pending"
                                        customClasses='hover:scale-90  hover:text-richblack-500'
                                        onClick={() => solveMessage(message)}
                                        children={<MdOutlinePendingActions />}
                                    />
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}
