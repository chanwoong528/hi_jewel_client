//@ts-nocheck

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_user, POST_loginUser } from "../fetchApi/userApi";
import { GET_productType } from "../fetchApi/productApi";
import queryKeys from "./queryKeys";

// export function useLoginUser(email, type, pw) {
//   return useQuery({
//     queryKey: queryKeys.user,
//     queryFn: () => POST_loginUser(email, type, pw),
//   });
// }

export function useGetUser() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [...queryKeys.user],
    queryFn: () => GET_user(),
    staleTime: 1000 * 5,
  });
}

export function useGetProductType() {
  return useQuery({
    queryKey: [...queryKeys.productType],
    queryFn: () => GET_productType(),
    staleTime: 1000 * 5,
  });
}
