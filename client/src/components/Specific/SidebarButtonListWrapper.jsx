import SidebarIconButton from "./SidebarIconButton";

const SidebarButtonListWrapper = ({ buttonList }) => {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      {buttonList.map((item, index) => (
        <SidebarIconButton key={index} {...item} />
      ))}
    </div>
  );
};

export default SidebarButtonListWrapper;
