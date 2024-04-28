import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchData = (keys = [], url) => {
  return useQuery({
    queryKey: ["keys"],
    queryFn: async () => {
      const res = await axios.get(url);
      return await res.data;
    },
  });
};

export default useFetchData;
