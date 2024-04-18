import { useParams } from "react-router-dom";

const Chat = () => {
  const { id } = useParams();
  return <div>Chat Id = {id}</div>;
};

export default Chat;
