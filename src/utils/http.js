import axios from "axios";

const request = axios.create({
  // baseURL: "http://47.95.13.131:8081/",
  timeout: 3000,
});
request.defaults.withCredentials = true;
request.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("doc_tocken");
  if (accessToken) config.headers.set("Token", `${accessToken}`);
  return config;
});
export default request;
