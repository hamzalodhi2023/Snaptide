import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleTokenRefresh } from "../redux/slices/authSlice";
import { getProfile } from "../redux/slices/profileSlice";

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const result = await dispatch(handleTokenRefresh());

      if (handleTokenRefresh.fulfilled.match(result)) {
        setTimeout(() => {
          dispatch(getProfile());
        }, 100); // small delay to ensure token set
      }
    };

    init();
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
