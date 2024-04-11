import { http } from "../http";

interface PostParam {
  title: string;
  content: string;
  type: "0" | "1" | "2";
  userEmail: string;
}

export const GET_post = async (postId?: string) => {
  try {
    const fetchPost = await http.get(`/post${postId ? `/${postId}` : ""}`);
    const data = await fetchPost.data;
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const POST_post = async (postData: PostParam) => {
  try {
    const fetchCreatePost = await http.post("/post", postData);
    const data = await fetchCreatePost.data;
    return data;
  } catch (error) {
    console.warn(error);
  }
};
