import { useParams } from "react-router-dom";
export default function Bar() {
  const params = useParams();
  console.log(params);
  return <div>Bar{params.id}</div>;
}
