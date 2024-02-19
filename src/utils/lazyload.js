import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
export const lazyload = (componentPath) => {
  const Component = React.lazy(() => import("@/views/" + componentPath));
  return () => (
    <React.Suspense
      fallback={
        <div className="flex justify-center items-center">
          <LoadingOutlined />
        </div>
      }
    >
      <Component />
    </React.Suspense>
  );
};
