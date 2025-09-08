// hooks/useUser.js
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../api/user";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUserProfile,
    refetchInterval: 15 * 60 * 1000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
