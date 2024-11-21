import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOpen } from "../slices/profileSlice";
import Sidebar from "../components/core/Dashboard/Sidebar";
import Loader from "../components/common/Loader";
import { FaGreaterThan } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";
import useOnClickOutside from "../hooks/useOnClickOutside";

export default function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading, open } = useSelector(
    (state) => state.profile
  );
  const ref = useRef(null);
  const dispatch = useDispatch();
  if (profileLoading || authLoading) {
    return <Loader />;
  }
  useOnClickOutside(ref, () => dispatch(setOpen(false)));

  return (
    <div className="flex relative  ">
      <div className="relative  md:relative flex " >
        <div className="hidden md:block transition-all duration-1000">
          <Sidebar />
        </div>

        <div className="md:hidden" ref={ref}>{open && <Sidebar />}</div>

      </div>

      {/* modal hidden */}
      <div className=" w-full  h-[calc(100vh-3.6rem)] overflow-y-scroll px-3  sm:px-10 ">
        <div className=" mx-auto overflow-y-auto lg:overflow-x-hidden pt-5  ">
          <div className="px-[10%] flex flex-col gap-5 md:hidden relative -left-[10%] mb-5">


            <div className=" text-richblack-100 flex justify-center items-center  w-10 h-10 rounded-full bg-richblack-600 "
              onClick={() => dispatch(setOpen(!open))}
            >
              <FaGreaterThan />
            </div>

          </div>
          <Outlet />

        </div>        
      </div>
    </div>
  );
}
