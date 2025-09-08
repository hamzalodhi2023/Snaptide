// src/components/AuthInitializer.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleTokenRefresh } from "../redux/slices/authSlice";

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleTokenRefresh());
  }, [dispatch]);

  return null; // no UI
};

export default AuthInitializer;
