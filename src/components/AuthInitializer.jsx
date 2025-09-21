import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleTokenRefresh } from "../redux/slices/authSlice";
import { getProfile } from "../redux/slices/profileSlice";

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        const result = await dispatch(handleTokenRefresh());

        if (handleTokenRefresh.fulfilled.match(result)) {
          setTimeout(() => {
            dispatch(getProfile());
          }, 100);
        } else {
          console.warn("Auto login failed: refresh token expired or invalid");
        }
      } catch (err) {
        console.error("Auto login failed:", err);
      }
    };

    init();
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
