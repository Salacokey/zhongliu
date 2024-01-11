import axios from "axios";

const request = axios.create({
  timeout: 3000,
});

export default request;
