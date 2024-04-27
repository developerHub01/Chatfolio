import { Button, Tooltip } from "@nextui-org/react";
import React from "react";

const IconButton = ({ id, text, onClick, Icon }) => {
  return (
    <>
      {text ? (
        <Tooltip
          key={id}
          showArrow
          content={text}
          placement="bottom"
          color="primary"
          radius="sm"
        >
          <Button
            isIconOnly
            onClick={onClick}
            className={`hover:scale-80 bg-transparent text-primary-500 hover:bg-primary-500 hover:text-white`}
          >
            <Icon className="text-2xl" />
          </Button>
        </Tooltip>
      ) : (
        <Button
          isIconOnly
          onClick={onClick}
          className={`hover:scale-80 bg-transparent text-primary-500 hover:bg-primary-500 hover:text-white`}
        >
          <Icon className="text-2xl" />
        </Button>
      )}
    </>
  );
};

export default IconButton;
