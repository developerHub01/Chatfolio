import {
  Button,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import IconButton from "../../shared/IconButton";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveEmojiOrGifs,
  changeMessage,
} from "../../../redux/slices/uiStatesSlice";
import EmojiGifsPopup from "./EmojiGifsPopup";
import { attatchmentButtonList } from "../../../utils/AttachmentButtonDataList";
import {
  AttachIcon,
  FaceIcon,
  MicrophoneIcon,
  PlayIcon,
  SendIcon,
  TrashIcon,
} from "../../../constants/icons";

import io from "socket.io-client";
import { SERVER_URL } from "../../../constants/values";
import { PauseIcon } from "@giphy/react-components";
const socket = io(SERVER_URL);

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

const TimeClip = ({ time }) => {
  return (
    <Chip color="primary" variant="bordered" size="sm" className="select-none">
      {time}
    </Chip>
  );
};

const getRandomHeight = () => `${40 + Math.round(Math.random() * 70)}%`;

const VoiceSignalPreview = ({ isPlay }) => {
  return (
    <div className="w-36 h-8">
      <motion.div
        {...(isPlay && {
          initial: {
            x: 0,
          },
          animate: {
            x: [-5, 0, 5, 0, 3],
          },
          transition: {
            repeat: Infinity,
            delay: Math.random() * 2 * 0.5,
            duration: 0.5,
          },
        })}
        className="h-full w-full flex justify-center items-center gap-1 overflow-hidden"
      >
        {Array(50)
          .fill(0)
          .map((item, i) => (
            <motion.span
              {...(isPlay && {
                initial: {
                  height: getRandomHeight(),
                },
                animate: {
                  height: getRandomHeight(),
                },
                transition: {
                  repeat: Infinity,
                  delay: Math.random() * 2 * 0.3,
                  duration: 0.4,
                },
              })}
              paused={isPlay}
              key={i}
              style={{
                height: getRandomHeight(),
              }}
              className={`block w-1 h-full flex-shrink-0 flex-grow-0 bg-primary-500 rounded-full`}
            ></motion.span>
          ))}
      </motion.div>
    </div>
  );
};

const AudioChat = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [listenRecord, setListenRecord] = useState(false);
  const handleTogglePlay = useCallback((value) => {
    if (typeof value === "undefined") return setIsPlay((prev) => value);
    setIsPlay((prev) => !prev);
  }, []);
  return (
    <Popover
      radius="sm"
      color=""
      offset={20}
      showArrow
      placement="top-end"
      onOpenChange={handleTogglePlay}
    >
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
        <div className="p-1 w-full flex justify-center items-center gap-3">
          <Button
            isIconOnly
            size="sm"
            radius="sm"
            color="primary"
            variant="ghost"
          >
            <TrashIcon className="text-lg" />
          </Button>

          {isPlay ? (
            <div className="flex justify-center items-center gap-2">
              <span className="size-2 block rounded-full bg-red-600"></span>
              <TimeClip time="0:00" />
              <VoiceSignalPreview isPlay={isPlay} />
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <Button
                isIconOnly
                size="sm"
                radius="sm"
                color="primary"
                variant="ghost"
                onClick={() => setListenRecord((prev) => !prev)}
              >
                {listenRecord ? (
                  <PauseIcon className="!text-xs" />
                ) : (
                  <PlayIcon className="text-lg" />
                )}
              </Button>
              <VoiceSignalPreview isPlay={isPlay} />
              <TimeClip time="0.17" />
            </div>
          )}
          <Button
            isIconOnly
            size="sm"
            radius="sm"
            color="primary"
            variant="ghost"
            onClick={() => setIsPlay((prev) => !prev)}
          >
            {isPlay ? (
              <PauseIcon className="text-xs" />
            ) : (
              <MicrophoneIcon className="text-lg" />
            )}
          </Button>
          <Button
            isIconOnly
            size="sm"
            radius="sm"
            color="primary"
            variant="ghost"
          >
            <SendIcon className="text-lg" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const ChatBottom = () => {
  const { _id: senderId } = useSelector((state) => state.authStates.user) || {};
  const { _id: receiverId, chatId } =
    useSelector((state) => state.activeChatStates.activeChat) || {};
  const [message, setMessage] = useState("");
  const disptach = useDispatch();
  useEffect(() => {}, [message]);

  const handleOnChangeMessage = (e) => {
    setMessage((prev) => e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    disptach(changeMessage(message));
    socket.emit("sendMessage", {
      senderId,
      message,
      receiverId,
      chatId,
    });
    setMessage((prev) => "");
  };

  const handleMessageKeyDown = (e) => {
    const isSubmit = e.key === "Enter" && !(e.ctrlKey || e.shiftKey);

    if (isSubmit) handleSendMessage(e);
  };

  const handleOpenEmojiAndGifs = (open) => {
    if (open) return disptach(changeActiveEmojiOrGifs({ activeTab: "emoji" }));
    else return disptach(changeActiveEmojiOrGifs(null));
  };

  return (
    <div className="w-full py-2 px-3 flex justify-between items-end gap-2 border-t-4 border-background-800">
      <Popover onOpenChange={handleOpenEmojiAndGifs}>
        <PopoverTrigger>
          <Button
            isIconOnly
            onClick={() => {}}
            className={`hover:scale-80 bg-transparent text-primary-500 hover:bg-primary-500 hover:text-white`}
          >
            <FaceIcon className="text-2xl" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 overflow-hidden">
          <EmojiGifsPopup />
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
        <PopoverContent className="p-1">
          <ul className="flex flex-col gap-1 w-40">
            {attatchmentButtonList.map(({ id, text, Icon }, _) => (
              <li className="w-full" key={id}>
                <input type="file" name={id} id={id} hidden />
                <motion.label
                  whileHover={{
                    scale: 0.95,
                  }}
                  htmlFor={id}
                  className="w-full flex justify-start items-center gap-3 px-3 py-2 text-base cursor-pointer text-primary-500 hover:text-white hover:bg-primary-500 rounded-md"
                >
                  <Icon className="text-lg" />
                  {text}
                </motion.label>
              </li>
            ))}
          </ul>
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
          <AudioChat />
        </motion.div>
      )}
    </div>
  );
};

export default ChatBottom;
