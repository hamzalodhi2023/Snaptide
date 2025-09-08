import axios from "axios";

export const fetchUserProfile = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SNAPTIDE_URL}/users/get-profile`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
