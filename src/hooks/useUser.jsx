// hooks/useUser.js
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../api/user";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUserProfile,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60 * 1000, // optional: cache for 60s
  });
};
