import React from 'react'
import { NavbarLinks } from "../../../data/navbar-links";
import { Link, matchPath } from "react-router-dom";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useLocation } from "react-router-dom";


export default function NavItem({loading, subLinks, customClass1, customClass2, ItemClick }) {
  const location = useLocation();
  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  return (
    <nav className={`${customClass2}`}>
          <ul className={`flex ${customClass1} gap-4 md:gap-5 text-richblack-25 `}>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p >{link.title}</p>
                    <IoIosArrowDropdownCircle />
                    <div className="invisible absolute box-border flex flex-col rounded-xl bg-richblack-5 p-4 text-richblack-600 opacity-0 transition-all duration-500 group-hover:visible group-hover:opacity-100 w-[130px] sm:w-[175px] -left-[120%]  sm:left-[10%] translate-x-[-50%] translate-y-[13%] -top-[200%] sm:top-[50%] z-20 ">

                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        <>
                          {subLinks
                            ?.filter((subLink) => subLink?.courses?.length > 0)
                            ?.map((sublink, index) => (
                              <Link
                                to={
                                  "catalog/" + sublink.name.split(" ").join("-")
                                }
                                onClick={ItemClick}
                                key={index}
                              >
                                <div className="hover:bg-richblack-50 py-2  px-3 rounded-md">
                                  <p>{sublink.name}</p>
                                </div>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                    
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    className={`${
                      matchRoute(link?.path)
                        ? "text-yellow-200"
                        : "text-richblack-100"
                    } hover:text-yellow-200 `}
                    onClick={ItemClick}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
  )
}
