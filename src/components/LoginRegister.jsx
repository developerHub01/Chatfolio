import {
  Button,
  Input,
  ScrollShadow,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EyeIcon, EyeSlashIcon } from "../constants/icons";
import {
  FACEBOOK_LOGIN_API,
  GOOGLE_LOGIN_API,
  LOGIN_API,
  REGISTER_API,
} from "../constants/values";
import useAuthPost from "../hooks/useAuthPost";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/slices/userAuthSlice";
import LoginRegisterLoader from "./loaders/LoginRegisterLoader";
import { layoutAnimProps } from "./animation/animationList";

const googleIcon =
  "https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png";
const facebookIcon =
  "https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png";

const inputAnimProps = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
  },
  exit: {
    scale: 0,
  },
};
const headingAnimProps = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
  },
};

const formInitialValues = {
  fullName: "",
  userName: "",
  email: "",
  password: "",
  gender: "male",
};
const genderData = [
  {
    id: "male",
    text: "Male",
  },
  {
    id: "female",
    text: "Female",
  },
];

const LoginRegister = () => {
  const dispatch = useDispatch();
  const postFormData = useAuthPost();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    ...formInitialValues,
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (isLoginTab && (!formData.email || !formData.password)) ||
      (!isLoginTab &&
        (!formData.fullName ||
          !formData.email ||
          !formData.password ||
          !formData.gender ||
          !formData.userName))
    ) {
      return;
    }

    const formDataToSend = isLoginTab
      ? {
          email: formData.email,
          password: formData.password,
        }
      : formData;

    // posting data in server
    const data = await postFormData(
      isLoginTab ? LOGIN_API : REGISTER_API,
      formDataToSend
    );

    const { success: isSuccess, user } = data;

    // If successfully loggedin
    if (isLoginTab && isSuccess) return dispatch(setUserData(user));

    // If successfully registered
    if (!isLoginTab && isSuccess) {
      setIsLoginTab((prev) => !prev);
      setFormData((prev) => ({ ...formInitialValues }));
    }
  };
  const handleToggleForm = () => setIsLoginTab((prev) => !prev);
  const handleTogglePasswordVisible = () =>
    setIsPasswordVisible((prev) => !prev);

  const handleGoogleAuth = () => {
    console.log(`login with google`);
    window.open(GOOGLE_LOGIN_API, "_self");
  };
  const handleFacebookAuth = () => {
    console.log(`login with facebook`);
    window.open(FACEBOOK_LOGIN_API, "_self");
  };

  const thirdPartyLoginButtons = [
    {
      id: "google",
      onClick: handleGoogleAuth,
      image: googleIcon,
    },
    {
      id: "facebook",
      onClick: handleFacebookAuth,
      image: facebookIcon,
    },
  ];
  const headingClasses = "h-12 text-center text-3xl font-bold text-primary-500";
  return (
    <Suspense fallback={<LoginRegisterLoader />}>
      <motion.div
        {...layoutAnimProps}
        className="w-screen h-screen !overflow-hidden p-5 flex justify-center items-center flex-col"
      >
        <div className="absolute h-[150vh] w-[400px] flex gap-11 -skew-x-[30deg]">
          {Array(3)
            .fill(0)
            .map((_, key) => (
              <span
                key={key}
                className="w-full h-full bg-primary-500 shadow-2xl"
              />
            ))}
        </div>
        <motion.div
          {...headingAnimProps}
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 1.05,
          }}
          className="w-full max-w-md max-h-[90vh] flex flex-col justify-center items-center gap-4 text-foreground-300 shadow-2xl px-4 sm:px-5 py-6 sm:py-8 rounded-md bg-background-900 backdrop-blur-xl overflow-hidden"
        >
          <div className="w-full h-14 overflow-hidden flex flex-col justify-center items-center">
            {isLoginTab ? (
              <motion.h1
                key={"login"}
                {...headingAnimProps}
                className={headingClasses}
              >
                Login
              </motion.h1>
            ) : (
              <motion.h1
                key={"register"}
                {...headingAnimProps}
                className={headingClasses}
              >
                Register
              </motion.h1>
            )}
          </div>
          <form
            className="p-1 w-full flex-1 overflow-hidden"
            onSubmit={handleSubmit}
          >
            <ScrollShadow
              hideScrollBar
              size={2}
              className="w-full h-full flex flex-col gap-3 sm:gap-4 px-1"
            >
              <AnimatePresence>
                {isLoginTab || (
                  <>
                    <motion.div {...inputAnimProps} className="w-full">
                      <Input
                        type="text"
                        variant="bordered"
                        placeholder="Full name"
                        className="w-full"
                        size="md"
                        radius="sm"
                        color="primary"
                        name="fullName"
                        value={formData["fullName"]}
                        onChange={handleChange}
                        required
                      />
                    </motion.div>
                    <motion.div {...inputAnimProps} className="w-full">
                      <Input
                        type="text"
                        variant="bordered"
                        placeholder="Username"
                        className="w-full"
                        size="md"
                        radius="sm"
                        color="primary"
                        value={formData["userName"]}
                        name="userName"
                        onChange={handleChange}
                        required
                      />
                    </motion.div>
                    <motion.div {...inputAnimProps} className="w-full">
                      <Select
                        label=""
                        placeholder="Gender"
                        size="md"
                        radius="sm"
                        variant="bordered"
                        color="primary"
                        name="gender"
                        value={formData["gender"]}
                        onChange={handleChange}
                        className="w-full text-primary-500"
                        classNames={{
                          label: "hidden",
                          innerWrapper: "!pt-0 border-primary-500",
                          trigger: "!hover:border-primary-500",
                        }}
                        isRequired
                      >
                        {genderData.map(({ id, text }) => (
                          <SelectItem
                            key={id}
                            value={id}
                            variant="solid"
                            color="primary"
                            className="w-full !text-capitalize text-foreground-300"
                          >
                            {text}
                          </SelectItem>
                        ))}
                      </Select>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
              <Input
                type="email"
                variant="bordered"
                placeholder="Email address"
                className="w-full"
                size="md"
                radius="sm"
                color="primary"
                value={formData["email"]}
                name="email"
                onChange={handleChange}
                required
              />
              <Input
                type={isPasswordVisible ? "text" : "password"}
                variant="bordered"
                placeholder="Password"
                className="w-full"
                size="md"
                radius="sm"
                color="primary"
                value={formData["password"]}
                name="password"
                onChange={handleChange}
                required
                endContent={
                  <Button
                    isIconOnly
                    size="sm"
                    radius="full"
                    type="button"
                    className="text-base"
                    onClick={handleTogglePasswordVisible}
                  >
                    {isPasswordVisible ? <EyeSlashIcon /> : <EyeIcon />}
                  </Button>
                }
              />
              <Button
                type="submit"
                color="primary"
                radius="sm"
                className="w-full flex-shrink-0"
              >
                {isLoginTab ? "Login" : "Register"}
              </Button>
              <div className="w-full flex justify-center items-center gap-2 flex-wrap">
                <p className="text-sm flex-1">
                  {isLoginTab
                    ? "Don't have account?"
                    : "Already have account? "}
                </p>
                <Button
                  variant="light"
                  size="md"
                  radius="sm"
                  onClick={handleToggleForm}
                >
                  {isLoginTab ? "Register" : "Login"}
                </Button>
              </div>
            </ScrollShadow>
          </form>
          <div className="w-full flex justify-between items-center gap-2 flex-col sm:flex-row">
            {thirdPartyLoginButtons.map(({ id, image, onClick }) => (
              <Button
                key={id}
                type="button"
                color="default"
                radius="sm"
                variant="faded"
                endContent={
                  <img src={image} className="size-5 object-contain" />
                }
                className="w-full"
                onClick={onClick}
              >
                Login with
              </Button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Suspense>
  );
};

export default LoginRegister;
