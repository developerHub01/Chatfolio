import React from "react";

const SettingHeading = ({ children }) => {
  return (
    <h3 className="text-lg sm:text-xl select-none text-foreground-300 font-bold pb-1 text-capitalize">
      {children}
    </h3>
  );
};

export default SettingHeading;
