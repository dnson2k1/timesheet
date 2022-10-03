import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
axiosInstance.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("token");
  const accessHeader = `Bearer ${accessToken}`;
  if (request.headers) {
    request.headers["Authorization"] = accessHeader;
  }
  return request;
});
export default axiosInstance;
