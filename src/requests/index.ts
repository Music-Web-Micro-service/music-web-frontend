import axios from 'axios';
import QS from 'qs';

const isProduction = process.env.NODE_ENV == 'production';

export const basicUrl = isProduction ? 'https://localhost:3370' : 'http://www.CHANGE-LATER.com';

const service = axios.create({
    baseURL: basicUrl
  });

//TODO 后续需要在这里写一个filter or intercepter 用来判断local storage或者session sotrage有无token，进行拦截操作
export default service;