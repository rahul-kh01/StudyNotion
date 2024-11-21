import React, { useEffect, useState } from "react";
import logo from "../../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { apiConnector } from "../../../services/apiConnector";
import { categories } from "../../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import ProfilrDropDown from "../../core/Auth/ProfileDropDown";
import toast from "react-hot-toast";
import NavItem from "./NavItem";
import ResponsiveNav from "./ResponsiveNav";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        // const id = toast.loading("Loading...")
        setLoading(true);
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(result.data.allTags);
        // console.log(result.data.allTags);
        setLoading(false);
        // toast.dismiss(id)
      } catch (error) {
        console.log("Could not fetch the category list");
      }
    })();
  }, []);

  return (
    <div className="relative mb-14">
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-900 transition-all duration-200 fixed top-0 w-full z-30`}
    >
      <div className="w-11/12 md:w-9/12 max-w-maxContent mx-auto flex justify-between items-center ">
        <Link to="/">
          <img src={logo} width={160} height={42} />
        </Link>

        <NavItem
          loading={loading}
          subLinks={subLinks}
          customClass1={"flex-row"}
          customClass2={"hidden md:block"}
        />

        {/* login/signup/dashboard/ cart*/}
        <div className="hidden md:flex items-center gap-x-4 ">
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

          {token === null && (
            <div className="flex gap-x-4 items-center">
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-lg   ">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-lg">
                  Sign up
                </button>
              </Link>
            </div>
          )}
          {
            // {token?console.log("yes"):console.log("no")}
            token && <ProfilrDropDown />
          }
        </div>

        {/* mobile responsive nav */}
        <ResponsiveNav loading={loading} subLinks={subLinks}/>
      </div>

      
    </div>
    </div>
  );
}
export default Navbar;
