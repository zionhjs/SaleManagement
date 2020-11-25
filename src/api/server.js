import axios from 'axios';
import envconfig from '@/envconfig/envconfig';
/**
 * main params
 * @params method {string} func names
 * @params url {string} request url  for example: /login 配合baseURL组成完整请求地址
 * @params baseURL {string} get prefixs ***needs to note***  例如：http://cangdu.org
 * @params timeout {number} request time / default 30000
 * @params params {object}  the key for get request
 * @params headers {string} sign header
 * @params withCredentials {boolean} attach cookie or not
 * @params validateStatus {func} default request success range 200 - 300
 * @return {Promise}
 * other extension for axios
*/

export default class Server {
  axios(method, url, params){
    return new Promise((resolve, reject) => {
      if(typeof params !== 'object') params = {};
      let _option = params;
      _option = {
        method,
        url,
        baseURL: envconfig.baseURL,
        timeout: 30000,
        params: null,
        data: null,
        headers: null,
        withCredentials: true,
        validateStatus:(status)=>{
            return status >= 200 && status < 300;
        },
        ...params,
      }
      axios.request(_option).then(res => {
        resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data))
      },error => {
        if(error.response){
            reject(error.response.data)
        }else{
            reject(error)
        }
      })
    })
  }
}
