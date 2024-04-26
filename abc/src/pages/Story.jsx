import { useParams } from "react-router-dom";

const Story = () => {
  const { id } = useParams();
  return <div>Story id = {id}</div>;
};

export default Story;
