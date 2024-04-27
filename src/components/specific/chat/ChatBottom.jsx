import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";
import {
  GrAttachment as AttachIcon,
  GrMicrophone as MicrophoneIcon,
} from "react-icons/gr";
import { LuSendHorizonal as SendIcon } from "react-icons/lu";
import { FaRegFaceGrinWide as FaceIcon } from "react-icons/fa6";
import IconButton from "../../shared/IconButton";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { changeMessage } from "../../../redux/slices/uiStatesSlice";

const iconAnimation = {
  initial: {
    scale: 0,
    rotate: 360,
    opacity: 0,
  },
  animate: {
    scale: 1,
    rotate: 0,
    opacity: 1,
  },
};

const ChatBottom = () => {
  const [message, setMessage] = useState("");
  const disptach = useDispatch();

  const handleOnChangeMessage = (e) => {
    setMessage((prev) => e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    disptach(changeMessage(message));
    setMessage((prev) => "");
  };

  const handleMessageKeyDown = (e) => {
    const isSubmit = e.key === "Enter" && !(e.ctrlKey || e.shiftKey);

    if (isSubmit) handleSendMessage(e);
  };

  return (
    <div className="w-full py-2 flex justify-between items-end gap-2 border-t-4">
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
        <Textarea
          variant="faded"
          color="primary"
          type="text"
          value={message}
          onKeyDown={handleMessageKeyDown}
          onChange={handleOnChangeMessage}
          placeholder="Type a message"
          minRows={1}
          classNames={{
            inputWrapper: [
              "bg-foreground-900",
              "dark:bg-background-900",
              "text-foreground-100",
            ],
            input: "max-h-[100px]",
          }}
        />
      </form>

      {message ? (
        <motion.span {...iconAnimation}>
          <IconButton Icon={SendIcon} onClick={handleSendMessage} text="Send" />
        </motion.span>
      ) : (
        <motion.div {...iconAnimation}>
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
        </motion.div>
      )}
    </div>
  );
};

export default ChatBottom;
