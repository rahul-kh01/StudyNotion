import React, { useState, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import ProfilrDropDown from "../../core/Auth/ProfileDropDown";
import { AiOutlineShoppingCart } from "react-icons/ai";

import useOnClickOutside from "../../../hooks/useOnClickOutside";

export default function ResponsiveNav({ loading, subLinks }) {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));


  return (
    <div className="md:hidden relative flex gap-5 items-center">
      <div className="md:hidden flex items-center gap-x-4 ">
          {user && user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

        </div>
      <div className="text-richblack-25 text-3xl cursor-pointer   "
        onClick={() => setOpen(!open)}
      >
        {!open && <FaBars />}

      </div>

      {open && (
        <div
          className={`${open ? "flex flex-col gap-2" : "hidden"
            } w-[180px] text-richblack-50 absolute z-30 -top-3 -right-3 border border-richblack-600 bg-richblack-800 py-4 rounded-md items-center transition-all ease-in-out duration-200`}
          onClick={(e) => e.stopPropagation()}
          ref={ref}
        >
          <div className="w-full flex justify-end items-center px-5 text-2xl " onClick={() => setOpen(!open)}>
            <RxCross2 />
          </div>
          <div className="flex flex-col gap-5 items-center">
            <div>
              {token === null && (
                <div className="flex  gap-2 items-center">
                  <Link to="/login">
                    <button
                      className="border border-richblack-700 bg-richblack-700 px-3 py-2 text-richblack-100 rounded-lg"
                      onClick={() => setOpen(false)}
                    >
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button
                      className="border border-richblack-700 bg-richblack-700 px-3 py-2 text-richblack-100 rounded-lg"
                      onClick={() => setOpen(false)}
                    >
                      Sign up
                    </button>
                  </Link>
                </div>
              )}
              {
                // token?console.log("yes"):console.log("no")
                <div className=" flex justify-center items-center">
                  {token && (
                    <ProfilrDropDown />
                  )}
                </div>
              }
            </div>

            <div>
              <NavItem
                loading={loading}
                subLinks={subLinks}
                open={open}
                customClass1={"flex-col"}
                customClass2={"block  md:hidden"}
                ItemClick={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
