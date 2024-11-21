import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { setOpen } from "../../../slices/profileSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmationModel from "../../common/ConfirmationModel";
import { VscSignOut } from "react-icons/vsc";
import { useSelector } from "react-redux";
import SidebarLink from "../Dashboard/SidebarLink";
import { FaLessThan } from "react-icons/fa";


export default function Sidebar() {
  const {
    loading: profileLoading,
    user,
    open,
  } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModel, setConfirmationModel] = useState(null);

  return (
    <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.6rem)] bg-richblack-800 pt-5 pb-10 absolute z-10 md:relative ">
      <div
        className="w-full relative flex justify-end px-5 pb-3"
        onClick={() => dispatch(setOpen(!open))}
      >
        <div className=" text-richblack-100 flex justify-center items-center md:hidden  w-10 h-10 rounded-full bg-richblack-600">
          <FaLessThan />
        </div>

      </div>
      
      <div className="flex flex-col">
        {sidebarLinks.map((link) => {
          if (link.type && link.type !== user?.accountType) return null;
          return <SidebarLink key={link.id} link={link} iconName={link.icon} />;
        })}
      </div>
      <div className="mx-auto  my-6 h-[1px] w-[87%] bg-richblack-600">
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() => {
              setConfirmationModel({
                text1: "Are You Sure ?",
                text2: "You will be logged out of your Account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModel(null),
              });
            }}
            className="text-sm  font-medium text-richblack-300 px-8 py-2"
          >
            <div className="w-[100%] flex items-center gap-x-2">
              <VscSignOut className="text-xl" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModel && <ConfirmationModel modalData={confirmationModel} />}
    </div>
  );
}
