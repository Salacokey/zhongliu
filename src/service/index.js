import request from "../utils/http";

// export const getFundRank = (params) =>
//   request.get("api/fundMNRank", { params });
export const postLogin = (data) => {
  return request.post("/api/login", data);
};

export const getUserInfo = (params) => request.get("/api/getInfo", { params });

export const getRoutes = (params) => request.get("/api/getRouters", { params });

export const getCaptchaImage = (params) =>
  request.get("/api/captchaImage", { params });

//查询科室管理列表
export const getDeptList = () => request.get("/api/business/Dept/list");

//获取所有科室列表
export const getDeptAlllist = () => request.get("/api/business/Dept/alllist");

/**
 *添加科室管理
 */
export const postDept = (data) => {
  console.log(data);
  return request.post("/api/business/Dept", data);
};
