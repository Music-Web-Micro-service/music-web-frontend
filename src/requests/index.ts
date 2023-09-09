import axios from "axios";
import {BASE_URL, TIMEOUT} from "./config";

const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

//TODO 后续需要在这里写一个filter or intercepter 用来判断local storage或者session sotrage有无token，进行拦截操作
export default service;
