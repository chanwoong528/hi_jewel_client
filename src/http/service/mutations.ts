//@ts-nocheck

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_user, POST_loginUser } from "../fetchApi/userApi";
import queryKeys from "./queryKeys";

interface UserParam {
  email: string;
  pw: string;
  type: "email" | "google" | "kakao";
}

export function useLoginUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userParam: UserParam) =>
      POST_loginUser(userParam.email, userParam.pw, userParam.type),
    onSettled: async (_, error) => {
      if (error) {
        return console.warn("useLoginUser[error]", error);
      }
      return await queryClient.invalidateQueries({
        queryKey: queryKeys.user,
      });
    },
  });
}

export function useClearUser() {
  const queryClient = useQueryClient();
  return queryClient.setQueryData(queryKeys.user, null);
}
