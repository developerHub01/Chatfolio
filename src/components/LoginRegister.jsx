import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaRegEye as EyeIcon,
  FaRegEyeSlash as EyeSlashIcon,
} from "react-icons/fa6";

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

const formInitialValues = { fullName: "", userName: "", password: "" };

const LoginRegister = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData((prev) => ({ ...formInitialValues }));
  };
  const handleToggleForm = () => setIsLoginTab((prev) => !prev);
  const handleTogglePasswordVisible = () =>
    setIsPasswordVisible((prev) => !prev);

  const handleGoogleAuth = () => {
    console.log(`login with google`);
  };
  const handleFacebookAuth = () => {
    console.log(`login with facebook`);
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
  return (
    <div className="w-full h-full p-10 flex justify-center items-center flex-col">
      <motion.form
        {...headingAnimProps}
        className="w-full max-w-md flex flex-col justify-center items-center gap-2 sm:gap-4 text-foreground-300 shadow-2xl px-4 sm:px-5 py-6 sm:py-8 rounded-md"
        onSubmit={handleSubmit}
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 1.05,
        }}
      >
        <div className="w-full h-10 overflow-hidden flex flex-col justify-center items-center">
          {isLoginTab ? (
            <motion.h1
              key={"login"}
              {...headingAnimProps}
              className="h-full text-center text-3xl pb-2 font-bold text-primary-500"
            >
              Login
            </motion.h1>
          ) : (
            <motion.h1
              key={"register"}
              {...headingAnimProps}
              className="h-full text-center text-3xl pb-2 font-bold text-primary-500"
            >
              Register
            </motion.h1>
          )}
        </div>
        <AnimatePresence>
          {isLoginTab || (
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
              />
            </motion.div>
          )}
        </AnimatePresence>
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
        <Button type="submit" color="primary" radius="sm" className="w-full">
          {isLoginTab ? "Login" : "Register"}
        </Button>
        <div className="w-full flex justify-center items-center gap-2 flex-wrap">
          <p className="text-sm flex-1">
            {isLoginTab ? "Don't have account?" : "Already have account? "}
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
        <div className="w-full flex justify-between items-center gap-2 flex-col md:flex-row">
          {thirdPartyLoginButtons.map(({ id, image, onClick }) => (
            <Button
              key={id}
              type="button"
              color="default"
              radius="sm"
              variant="faded"
              endContent={<img src={image} className="size-5 object-contain" />}
              className="w-full"
              onClick={onClick}
            >
              Login with
            </Button>
          ))}
        </div>
      </motion.form>
    </div>
  );
};

export default LoginRegister;
