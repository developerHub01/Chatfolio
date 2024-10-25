import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AUTH_USER_DATA_API,
  USER_PREFERENCES_DATA_API,
} from "./constants/values";
import useAuthGet from "./hooks/useAuthGet";
import { setUserData } from "./redux/slices/userAuthSlice";
import { setPreferencesStates } from "./redux/slices/preferencesSlice";
import PreviewImage from "./components/popups/PreviewImage";
import { AnimatePresence } from "framer-motion";
import LayoutLoader from "./components/loaders/LayoutLoader";
const App = lazy(() => import("./App"));
const LoginRegister = lazy(() => import("./components/LoginRegister"));

const fetchUser = async (getData, dispatch, api, setData, data) => {
  try {
    const responseData = await getData(api);
    return responseData.success
      ? dispatch(setData(responseData[data]))
      : dispatch(setData(null));
  } catch (error) {
    return error;
  }
};

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.authStates);
  const { previewImage } = useSelector((state) => state.uiStates);
  const dispatch = useDispatch();
  const authGet = useAuthGet();

  useEffect(() => {
    setIsLoading((prev) => true);
    fetchUser(authGet, dispatch, AUTH_USER_DATA_API, setUserData, "user");
  }, []);
  useEffect(() => {
    if (!user) {
      setIsLoading((prev) => false);
      return;
    }

    setIsLoading((prev) => true);
    fetchUser(
      authGet,
      dispatch,
      USER_PREFERENCES_DATA_API,
      setPreferencesStates,
      "data"
    );
    setIsLoading((prev) => false);
  }, [user]);
  return (
    <div className="h-screen flex text-foreground-500 overflow-hidden bg-background-900">
      {isLoading ? <LayoutLoader /> : user ? <App /> : <LoginRegister />}

      {previewImage && (
        <AnimatePresence>
          <PreviewImage />
        </AnimatePresence>
      )}
    </div>
  );
};

export default MainPage;
