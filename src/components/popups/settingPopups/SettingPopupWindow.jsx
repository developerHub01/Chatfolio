import { Suspense, memo } from "react";
import SettingPopupWindowMenu from "./SettingPopupWindowMenu";
import SettingPopupWindowContent from "./SettingPopupWindowContent";
import SettingPopupWindowLoader from "../../loaders/SettingPopupWindowLoader";

const SettingPopupWindow = () => {
  return (
    <Suspense fallback={<SettingPopupWindowLoader />}>
      <div className="w-[95dvw] h-[85vh] max-w-md max-h-[550px] overflow-hidden text-foreground-500 bottom-3">
        <SettingPopupWindowMenu />
        <SettingPopupWindowContent />
      </div>
    </Suspense>
  );
};

export default memo(SettingPopupWindow);
