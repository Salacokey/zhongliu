import { Button } from "antd";
import { Link, useSearchParams } from "react-router-dom";
export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  console.log("a", searchParams.get("a"));
  console.log("b", searchParams.get("b"));
  console.log([...searchParams.entries()]);
  return (
    <div>
      <Link to="/bar">
        <Button type="dashed" danger>
          to Bar
        </Button>
      </Link>
      <Button onClick={() => setSearchParams({ a: 100 })}>修改参数a=100</Button>
    </div>
  );
}
