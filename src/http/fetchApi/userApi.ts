import { http } from "../http";
import Cookies from "js-cookie";

export const POST_registerUser = async (
  email: string,
  pw: string,
  type: string
) => {
  try {
    const fetchCreateUser = await http.post("/user", {
      email,
      pw,
      type,
    });
    const data = await fetchCreateUser.data;

    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const POST_loginUser = async (
  email: string,
  pw: string,
  type: string
) => {
  try {
    const fetchLoginUser = await http.post("/user/login", {
      email,
      pw,
      type,
    });
    const data = await fetchLoginUser.data;
    localStorage.setItem("accessToken", data.data.access_token);
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const GET_user = async () => {
  try {
    const fetchUser = await http.get("/user");
    const data = await fetchUser.data;

    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const GET_userList = async () => {
  try {
    const fetchUserList = await http.get("/user/list");
    const data = await fetchUserList.data;
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const PATCH_userRole = async (id: string, role: string) => {
  try {
    const fetchUpdateUser = await http.patch("/user/update", { id, role });
    const data = await fetchUpdateUser.data;
    return data;
  } catch (error) {}
};
