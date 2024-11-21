import toast from 'react-hot-toast'
import { apiConnector } from '../apiConnector'
import { catalogData } from '../apis'

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API,
      { categoryId });

    if (!response?.data?.success)
      throw new Error("Could not Fetch Category page data");

    result = response?.data;

  }
  catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    console.log(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}


export const getAverageRating = async (courseId) => {
  // const toastId = toast.loading("Loading...");
  let result;

  try {
    const response = await apiConnector("POST", catalogData.AVERAGE_RATING_API,
      { courseId });

    if (!response?.data?.success)
      throw new Error("Could not Fetch Category page data");
    result = response?.data;

  }
  catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    console.log(error.message);
    result = error.response?.data;
  }
  // toast.dismiss(toastId);
  return result;
}
