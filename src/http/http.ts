import axios from "axios";

// const DEV_BASE_RESTAPI = "https://hijewelserver-production.up.railway.app";
const DEV_BASE_RESTAPI = "http://localhost:5002";

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

http.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 498) {
      const refToken = localStorage.getItem("refreshToken");

      const res = await axios.post(
        `${DEV_BASE_RESTAPI}/user/generate-access-token`,
        {
          refreshToken: refToken,
        }
      );
      if (res.data.code === 201) {
        localStorage.setItem("accessToken", res.data.data["access_token"]);
        originalRequest.headers[
          "authorization"
        ] = `Bearer ${res.data.data["access_token"]}`;
        http.defaults.headers.common[
          "authorization"
        ] = `Bearer ${res.data.data["access_token"]}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
