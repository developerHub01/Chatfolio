import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import {
  GrAttachment as AttachIcon,
  GrMicrophone as MicrophoneIcon,
} from "react-icons/gr";
import { LuSendHorizonal as SendIcon } from "react-icons/lu";
import { FaRegFaceGrinWide as FaceIcon } from "react-icons/fa6";
import IconButton from "../../shared/IconButton";

const ChatBottom = () => {
  const [message, setMessage] = useState("");

  const handleOnChangeMessage = (e) => {
    setMessage((prev) => e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    setMessage((prev) => "");
  };

  return (
    <div className="w-full py-2 flex gap-2 border-t-4">
      <Popover>
        <PopoverTrigger>
          <Button
            isIconOnly
            onClick={() => {}}
            className={`hover:scale-80 bg-transparent text-primary-500 hover:bg-primary-500 hover:text-white`}
          >
            <FaceIcon className="text-2xl" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <Button
            isIconOnly
            onClick={() => {}}
            className={`hover:scale-80 bg-transparent text-primary-500 hover:bg-primary-500 hover:text-white`}
          >
            <AttachIcon className="text-2xl" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
        </PopoverContent>
      </Popover>
      <form onSubmit={handleSendMessage} className="flex-1">
        <Input
          variant="faded"
          color="primary"
          type="text"
          value={message}
          onChange={handleOnChangeMessage}
          placeholder="Type a message"
          classNames={{
            inputWrapper: [
              "bg-foreground-900",
              "dark:bg-background-900",
              "text-foreground-100",
            ],
          }}
        />
      </form>

      {message ? (
        <IconButton Icon={SendIcon} onClick={handleSendMessage} text="Send" />
      ) : (
        <Popover>
          <PopoverTrigger>
            <Button
              isIconOnly
              onClick={() => {}}
              className={`hover:scale-80 bg-transparent text-primary-500 hover:bg-primary-500 hover:text-white`}
            >
              <MicrophoneIcon className="text-2xl" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">Popover Content</div>
              <div className="text-tiny">This is the popover content</div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default ChatBottom;
