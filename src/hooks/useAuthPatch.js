import React from "react";
import axios from "axios";

const useAuthPatch = () => async (url, dataToPatch) => {
  try {
    const res = await axios.patch(url, dataToPatch, { withCredentials: true });
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
};

export default useAuthPatch;
