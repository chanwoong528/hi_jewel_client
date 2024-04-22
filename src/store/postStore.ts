import { create } from "zustand";

export type Post = {
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
type PostEditType = {
  id?: string;
  title?: string;
  content?: string;
  postPw?: string;
  userEmail?: string;
  type?: "0" | "1" | "2";
  parentPostId?: string | null;
  isPresented?: "0" | "1";
};

interface PostState {
  postList: Post[];
  setPostList: (postList: Post[]) => void;
  addPost: (post: Post) => void;
  updatePostItem: (post: PostEditType) => void;
}

const usePostStore = create<PostState>((set) => ({
  postList: [],
  setPostList: (postList) =>
    set(() => ({
      postList: postList,
    })),
  addPost: (post) => set((state) => ({ postList: [...state.postList, post] })),
  updatePostItem: (post) => {
    set((state) => ({
      postList: state.postList.map((item) =>
        item.id === post.id ? { ...item, ...post } : item
      ),
    }));
  },
}));

export default usePostStore;
