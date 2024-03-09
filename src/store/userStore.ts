import { create } from "zustand";

type TypeUser = {
  userId: string | undefined;
  userEmail: string | undefined;
  userRole: "admin" | "user" | undefined;
  userType: "email" | "google" | "kakao" | undefined;
  // createdAt: string;
  // updatedAt: string;
};

type userParam = {
  id: string | undefined;
  email: string | undefined;
  role: "admin" | "user" | undefined;
  type: "email" | "google" | "kakao" | undefined;
};
interface UserState {
  userInfo: TypeUser;
  updateUser: (userInfo: userParam) => void;
  resetUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  userInfo: {
    userId: undefined,
    userEmail: "",
    userRole: undefined,
    userType: undefined,
  },
  updateUser: (userInfo: userParam) =>
    set(() => ({
      userInfo: {
        userId: userInfo.id,
        userEmail: userInfo.email,
        userRole: userInfo.role,
        userType: userInfo.type,
      },
    })),
  resetUser: () =>
    set(() => ({
      userInfo: {
        userId: undefined,
        userEmail: "",
        userRole: undefined,
        userType: undefined,
      },
    })),
}));

export default useUserStore;
