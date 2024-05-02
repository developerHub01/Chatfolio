import React from "react";
import axios from "axios";

const useAuthPost = () => async (url, dataToPost) => {
  const res = await axios.post(url, dataToPost, { withCredentials: true });
  return await res.data;
};

export default useAuthPost;
