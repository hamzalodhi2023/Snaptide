import axios from "axios";
import api from "./axios";

export const fetchUserProfile = async () => {
  try {
    const res = await api.get("/users/get-profile");
    return res.data;
  } catch (err) {
    throw err;
  }
};
