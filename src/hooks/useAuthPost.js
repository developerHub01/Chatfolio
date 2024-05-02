import React from "react";
import axios from "axios";

const useAuthPost = () => async (url, dataToPost) => {
  try {
    const res = await axios.post(url, dataToPost, { withCredentials: true });
    return await res.data;
  } catch (error) {
    return error;
  }
};

export default useAuthPost;
