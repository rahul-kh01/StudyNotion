import axios from "axios";
import { endpoints } from "./apis";
import { setToken } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";


export const axiosInstance = axios.create({});

let retryCount = 0;
const maxRetry = 3;

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    withCredentials: true,
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (retryCount < maxRetry) retryCount++;
      else {
        localStorage.clear()
        dispatch(setToken(null));
        dispatch(setUser(null));
        window.location.href = "/login";
        console.log("Token expired");
      }
      try {
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        const response = await apiConnector('POST', endpoints.REFRESHTOKEN_API, { userId });
        console.log("REFRESH TOKEN RESPONSE", response);
        if (response.status === 200) {
          const newAccessToken = response.data.token;
          localStorage.setItem(
            "token",
            JSON.stringify(newAccessToken)
          );
          dispatch(setToken(newAccessToken));
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance.request(error.config);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
        localStorage.clear()
        dispatch(setToken(null));
        dispatch(setUser(null));
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);