import { http } from "../http";

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
