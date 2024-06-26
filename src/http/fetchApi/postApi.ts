import { http } from "../http";

export enum PostType {
  qna = "0",
  notice = "1",
  comment = "2",
}

interface PostParam {
  title?: string;
  content: string;
  type: PostType;
  userEmail: string;
}
interface PostEditParam {
  title?: string;
  content?: string;
  type?: PostType;
  isPresented?: "0" | "1";
}

export const GET_post = async (postId?: string, getType?: string) => {
  try {
    const fetchPost = await http.get(`/post`, {
      params: {
        ...(!!getType && { getType: getType }),
        ...(!!postId && { postId: postId }),
      },
    });
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

export const PATCH_post = async (
  postId: string,
  postEditData: PostEditParam
) => {

  try {
    const fetchPatchPost = await http.patch(`/post/${postId}`, postEditData);
    const data = await fetchPatchPost.data;
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const DELETE_post = async (postId: string) => {
  try {
    const fetchDeletePost = await http.delete(`/post/${postId}`);
    console.log(fetchDeletePost);

    return fetchDeletePost;
  } catch (error) {
    console.warn(error);
  }
};
