import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { catalogData, categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/CatalogPageData";
import Footer from "../components/common/Footer";
import CourseSlider from "../components/core/Catelog/CourseSlider";
import { apiConnector } from "../services/apiConnector";
import CourseTemplet from "../components/core/Catelog/CourseTemplet";
import Loader from "../components/common/Loader";
import { useSelector } from "react-redux";
import Error from "../components/common/Error";

export default function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams();
  const [active, setActive] = useState(1)
  const [categoryPageData, setCategoryPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      //   console.log(res);
      const category = res.data.allTags.filter(
        (ctgry) =>
          ctgry.name.split(" ").join("-").toLowerCase() ===
          catalogName.toLowerCase()
      )[0]._id;
      setCategoryId(category);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        // console.log(res);
        setCategoryPageData(res);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryDetails();
  }, [categoryId]);

  if (loading || !categoryPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <Loader />
      </div>
    );
  }
  if (!loading && !categoryPageData.success) {
    setTimeout(() => {
      <Error message={categoryPageData.message} />;
    }, 2000);
    return <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center"><Loader /></div>
  }

  return (
    <div className=" box-content bg-richblack-800 px-4">
      <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
        <p className="text-sm text-richblack-300">
          {`Home / Catelog / `}{" "}
          <span className="text-yellow-25">
            {categoryPageData?.data?.selectedCategory?.name}
          </span>{" "}
        </p>
        <p className="text-3xl text-richblack-5">
          {categoryPageData?.data?.selectedCategory?.name}
        </p>
        <p className="max-w-[870px] text-richblack-200">
          {categoryPageData?.data?.selectedCategory?.description}
        </p>
      </div>
      <div>
        {/* section-1 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab md:px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading">Courses to get you started</div>
          <div className="my-4 flex border-b border-b-richblack-600 text-sm">
            <p
              className={`px-4 py-2 ${active === 1
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-richblack-50"
                } cursor-pointer`}
              onClick={() => setActive(1)}
            >
              Most Populer
            </p>
            <p
              className={`px-4 py-2 ${active === 2
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-richblack-50"
                } cursor-pointer`}
              onClick={() => setActive(2)}
            >
              New
            </p>
          </div>
          <div>
            <CourseSlider
              courses={categoryPageData?.data?.selectedCategory?.courses}
            />
          </div>
        </div>

        {/* section-2 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab md:px-4 py-12 lg:max-w-maxContent">
          <p className="section_heading">Top Courses in {categoryPageData?.data?.selectedCategory?.name}</p>
          <div className="py-8">
            <CourseSlider
              courses={categoryPageData?.data?.differentCategory?.courses}
            />
          </div>
        </div>

        {/* section-3 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab md:px-4 py-12 lg:max-w-maxContent">
          <p className="section_heading">Frequently Bought</p>
          <div className="py-8">
            <div className="grid max-[450px]:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 lg:grid-cols-4   sm:justify-start gap-6  ">
              {categoryPageData?.data?.mostSellingCourses
                ?.slice(0, 4)
                .map((course, index) => (
                  <CourseTemplet
                    course={course}
                    key={index}
                    Height={"h-[200px] w-[250px] "}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
