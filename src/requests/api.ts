import { AxiosRequestConfig } from "axios";
import serivce  from "./index";

export const apiTestApiAdd = (info:AxiosRequestConfig) => serivce.post('/api/test/api', info);
//call example 

// apiArticleEdit(params).then(res => { 
//     console.log(res)
//   })
// }