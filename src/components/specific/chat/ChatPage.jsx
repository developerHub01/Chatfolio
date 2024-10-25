import React, { useCallback, useEffect, useState } from "react";
import ChatTop from "./ChatTop";
import ChatBottom from "./ChatBottom";
import ChatContents from "./ChatContents";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { chatPageAnim } from "../../animation/animationList";
import useAuthGet from "../../../hooks/useAuthGet";
import { GET_CHAT_DETAILS_API } from "../../../constants/values";
import { setActiveChatDataState } from "../../../redux/slices/activeChatSlice";

const ChatPage = () => {
  const { activeChat: {id: activeChatId}, activeChatPreview } = useSelector(
    (state) => state.activeChatStates
  ) || {};

  const getDataMethod = useAuthGet();
  const dispatch = useDispatch();
  const URL = `${GET_CHAT_DETAILS_API}/${activeChatId}`;
  const getChatDetails = useCallback(async () => {
    dispatch(
      setActiveChatDataState({
        isLoading: true,
        isError: false,
        data: [],
      })
    );

    const { success, error, data } = await getDataMethod(URL);

    return dispatch(
      setActiveChatDataState({
        isLoading: false,
        isError: error ? error : false,
        data: success ? data : [],
      })
    );
  }, [URL, activeChatId]);
  useEffect(() => {
    if(activeChatId) getChatDetails();
  }, [URL, activeChatId]);
  return (
    <AnimatePresence>
      {(!!activeChatPreview || !!activeChatId) && (
        <motion.section
          {...chatPageAnim}
          className="h-screen w-full flex flex-col"
        >
          <ChatTop />
          <ChatContents />
          <ChatBottom />
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default ChatPage;
