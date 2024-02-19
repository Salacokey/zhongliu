"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _zustand = require("zustand");

var _immer = require("zustand/middleware/immer");

var userUserStore = (0, _zustand.create)((0, _immer.immer)(function (set) {
  return {
    user: {
      name: "星河",
      age: 15
    },
    setUserAge: function setUserAge() {
      set(function (state) {
        state.user.age++;
      });
    },
    setUserName: function setUserName(name) {
      set(function (state) {
        state.user.name = name;
      });
    }
  };
}));
var _default = userUserStore;
exports["default"] = _default;