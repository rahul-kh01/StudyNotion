import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints, contactusEndpoint } from "../apis"


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  LOGOUT_API
} = endpoints


export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)


      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  accountType,
  otp,
  secretKey,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      // console.log(otp);
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        secretKey
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, { email, password })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    // const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })

      console.log("RESETPASSTOKEN RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // toast.dismiss(toastId);
      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error);
      // toast.dismiss(toastId);
      toast.error("Failed To Send Reset Email");
    }
    dispatch(setLoading(false));


  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  // const navigate=useNavigate();
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {

      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password Reset Successfully")
      navigate("/login")
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function logout(navigate, token) {
  return async (dispatch) => {
    try {
      //clear cookies
      const response = await apiConnector("GET", LOGOUT_API, null, { 'Authorization': `Bearer ${token}` })
      console.log("LOGOUT API RESPONSE............", response)
      if (!response.data.success) {
        console.log(response)
        // throw new Error(response.data.message)
      }
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
      localStorage.clear()
      toast.success("Logged Out")
      navigate("/login")
    } catch (error) {
      alert(error)
      console.log("LOGOUT API ERROR............", error)
      toast.error("Failed To Logout")
    }
  }
}



//contact messages
// allcontactmsg
export async function getAllMessages(token) {
  const toastId = toast.loading("Loading...")
  let result = [];
  try {
    const response = await apiConnector("GET", contactusEndpoint.CONTACT_US_MESSAGES_API, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log(" ALL MESSAGES ...........", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    if (response.data.success) result = response.data.allMessages
  } catch (error) {
    console.log("GET ALL MESSAGES API ERROR............", error)
    toast.error("Could Not Get Messages")
  }
  toast.dismiss(toastId)
  return result
}

export async function deleteMessage(token, id) {
  let result;
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("DELETE", contactusEndpoint.CONTACT_US_MESSAGE_API + `/${id}`, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log(" DELETE MESSAGE ...........", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data

    toast.success("Message Deleted Successfully")
  } catch (error) {
    console.log("DELETE MESSAGE API ERROR............", error)
    toast.error("Could Not Delete Message")
  }
  toast.dismiss(toastId)
  return result
}

export async function getAdminData(token) {
  const toastId = toast.loading("Loading...")
  let result;

  try {
    const response = await apiConnector("GET", endpoints.GET_ADMIN_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    })

    console.log(" ADMIN DATA RESPONSE ...........", response.data.data)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    result = response.data.data
  } catch (error) {
    console.log("GET ALL MESSAGES API ERROR............", error)
    toast.error("Could Not Get Messages")
  }
  toast.dismiss(toastId)
  return result
}