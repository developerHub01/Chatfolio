import React, { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AUTH_USER_DATA_API, BASE_URL } from "./constants/values";
import useAuthGet from "./hooks/useAuthGet";
import { setUserData } from "./redux/slices/userAuthSlice";
import PreviewImage from "./components/popups/PreviewImage";
import { AnimatePresence } from "framer-motion";
const App = lazy(() => import("./App"));
const LoginRegister = lazy(() => import("./components/LoginRegister"));

const MainPage = () => {
  const { user } = useSelector((state) => state.authStates);
  const { previewImage } = useSelector((state) => state.uiStates);
  const dispatch = useDispatch();
  const getUser = useAuthGet();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(AUTH_USER_DATA_API);
        userData.success
          ? dispatch(setUserData(userData.user))
          : dispatch(setUserData(null));
      } catch (error) {
        return error;
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="h-screen flex text-foreground-500 overflow-hidden bg-background-900">
      {user ? <App /> : <LoginRegister />}

      {previewImage && (
        <AnimatePresence>
          <PreviewImage />
        </AnimatePresence>
      )}
    </div>
  );
};

export default MainPage;
