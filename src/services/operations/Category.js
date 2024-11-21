import { categories } from "../apis"
import { apiConnector } from "../apiConnector"
import { toast } from "react-hot-toast"



const { CREATE_CATEGORY_API, DELETE_CATEGORY_API, UPDATE_CATEGORY_API } = categories

export async function createCategory({name,  description}, token) {
    const toastId = toast.loading("Loading...")
    let result;
    try {
        // console.log("CREATE_CATEGORY_API API............", name, description, token)
        const response = await apiConnector("POST", CREATE_CATEGORY_API, { name, description }, {
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Category Created Successfully")
        result= response.data.tagDetails
    } catch (error) {
        console.log("CREATE_CATEGORY_API API ERROR............", error)
        toast.error(error?.response?.data?.message || "Could Not Create Category")
    }
    toast.dismiss(toastId)
    return result
}

export async function deleteCategory(categoryId, token) {
    const toastId = toast.loading("Loading...")
    let result;
    try {
        const response = await apiConnector("DELETE", DELETE_CATEGORY_API, { categoryId }, {
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        console.log("DELETE_CATEGORY_API API............", response)
        result= response.data
    } catch (error) {
        console.log("DELETE_CATEGORY_API API ERROR............", error)
        toast.error("Could Not Delete Category")
        result = error.response.data
    }
    toast.dismiss(toastId)
    return result
}

export async function updateCategory(categoryId, categoryName, categoryDesc, token) {
    const toastId = toast.loading("Loading...")
    let result;
    try {
        const response = await apiConnector("PUT", UPDATE_CATEGORY_API, { categoryId, name:categoryName, description:categoryDesc }, {
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result= response.data
    } catch (error) {
        console.log("UPDATE_CATEGORY_API API ERROR............", error)
        toast.error("Could Not Update Category")
    }
    toast.dismiss(toastId)
    return result
}
