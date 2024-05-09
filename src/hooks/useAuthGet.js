import axios from "axios";

const useAuthGet = () => async (url) => {
  try {
    const res = await axios.get(url, { withCredentials: true });
    return await res.data;
  } catch (error) {
    return error;
  }
};

export default useAuthGet;
