import { create } from "zustand";

type Post = {
  id: string;
  title: string;
  content: string;
  postPw: string;
  userEmail: string;
  type: "0" | "1" | "2";
  parentPostId: string | null;
  isPresented: "0" | "1";
  createdAt: string;
  updatedAt: string;
};

interface PostState {
  postList: Post[];
  setPostList: (postList: Post[]) => void;
}

const usePostStore = create<PostState>((set) => ({
  postList: [],
  setPostList: (postList) =>
    set(() => ({
      postList: postList,
    })),
}));

export default usePostStore;
