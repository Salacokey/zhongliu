import request from "../utils/http";

export const getFundRank = (params) => request.get("api/fundMNRank", { params });
