import { FaUserFriends } from "react-icons/fa";
import { ImTree } from "react-icons/im";
import '../../../App.css';

function Card({ tag, desc, level, lessionNumber, activate, course}) {
    const active = tag===course;
    return (
        <div 
        className={` box-border 
        ${active?"text-black bg-white card-shadow":
        "text-white bg-richblack-800"}  cursor-pointer`}
        onClick={()=>activate(tag)}>

            <div className="h-[244px]  flex flex-col gap-5 p-5">
                <p className="text-2xl font-semibold">{tag}</p>
                <p className={`text-base ${active?"text-richblack-600":
                "text-richblack-400"}`}>{desc}</p>
            </div>

            <div className={`h-[56px] py-3 px-5 border-dashed border-t-2 flex justify-between 
            ${active?"text-blue-400 ":"text-richblack-400"}`}>
                <div className="flex gap-2 text-xl items-center">
                    <FaUserFriends className="text-2xl"/>
                    {level}
                </div>
                <div className="flex gap-2 text-xl">
                    <ImTree />
                    <p>{lessionNumber} Lessons </p>
                </div>
            </div>
            
        </div >
    )
}
export default Card;