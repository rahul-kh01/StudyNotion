import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { setLoading,setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API } = profileEndpoints;

//ekhono kaje lageni
export function getUserDetails(token, navigate) {
    // const navigate = useNavigate()
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try {

            const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
                Authorization: `Bearer ${token}`,
            })
            console.log("GET_USER_DETAILS API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            const userImage = response.data.data.image
                ? response.data.data.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
            dispatch(setUser({ ...response.data.data, image: userImage }))
        } catch (error) {
            dispatch(logout(navigate))
            console.log("GET_USER_DETAILS API ERROR............", error)
            toast.error("Could Not Get User Details")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export async function getUserEnrolledCourses(token) {
    let result = []
    const toastId = toast.loading("Loading...")
    try {

        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        )

        console.log("GET_USER_ENROLLED_COURSES_API API RESPONSE............", response)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data
    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...")
    let result = []

    try {

        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`,
        })
        console.log("getInstructorData response", response)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.courses

    } catch (error) {
        console.log("getInstructorData error", error)
        toast.error("Could Not Get Instructor Data")
    }
    toast.dismiss(toastId)
    return result
}