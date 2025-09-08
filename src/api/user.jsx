import api from "./axios";

export const fetchUserProfile = async () => {
  const res = await api.get("/users/get-profile");
  return res.data;
};
