// 包含工具函数的模块
import { v4 as uuidv4 } from "uuid";

export function getUserTempId() {
  let userTempId = localStorage.getItem("USER_TEMP_ID_KEY");
  if (!userTempId) {
    userTempId = uuidv4();
    localStorage.setItem("USER_TEMP_ID_KEY", userTempId);
  }
  return userTempId;
}

//  保存用户信息
export function saveUserInfo(userInfo) {
  localStorage.setItem("USER_INFO_KEY", JSON.stringify(userInfo));
}

// 读取local用户信息
export function getUserInfo() {
  return JSON.parse(localStorage.getItem("USER_INFO_KEY")) || {};
}
