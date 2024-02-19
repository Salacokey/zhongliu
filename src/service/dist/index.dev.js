"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postDept = exports.getDeptAlllist = exports.getDeptList = exports.getCaptchaImage = exports.getRoutes = exports.getUserInfo = exports.postLogin = void 0;

var _http = _interopRequireDefault(require("../utils/http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// export const getFundRank = (params) =>
//   request.get("api/fundMNRank", { params });
var postLogin = function postLogin(data) {
  return _http["default"].post("/api/login", data);
};

exports.postLogin = postLogin;

var getUserInfo = function getUserInfo(params) {
  return _http["default"].get("/api/getInfo", {
    params: params
  });
};

exports.getUserInfo = getUserInfo;

var getRoutes = function getRoutes(params) {
  return _http["default"].get("/api/getRouters", {
    params: params
  });
};

exports.getRoutes = getRoutes;

var getCaptchaImage = function getCaptchaImage(params) {
  return _http["default"].get("/api/captchaImage", {
    params: params
  });
}; //查询科室管理列表


exports.getCaptchaImage = getCaptchaImage;

var getDeptList = function getDeptList() {
  return _http["default"].get("/api/business/Dept/list");
}; //获取所有科室列表


exports.getDeptList = getDeptList;

var getDeptAlllist = function getDeptAlllist() {
  return _http["default"].get("/api/business/Dept/alllist");
};
/**
 *添加科室管理
 */


exports.getDeptAlllist = getDeptAlllist;

var postDept = function postDept(data) {
  console.log(data);
  return _http["default"].post("/api/business/Dept", data);
};

exports.postDept = postDept;