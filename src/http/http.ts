import axios from "axios";

const DEV_BASE_RESTAPI = "https://hijewelserver-production.up.railway.app";
// const DEV_BASE_RESTAPI = "http://localhost:5002";

export const http = axios.create({
  baseURL: DEV_BASE_RESTAPI,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  if (localStorage.getItem("accessToken")) {
    let accessToken = localStorage.getItem("accessToken");

    config.headers["authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// export const setHttpHeaderToken = (token: string) => {
//   http.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   });
// };

// export function getCookie(name: string) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
// }
