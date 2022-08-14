import axios from "axios";

/* CORS 에러가 어쩔때는 잘되고 어쩔때는 잘 안됨
Access to XMLHttpRequest at 'http://localhost:8000/api/v1/auth/token' from origin 'http://localhost:3000' has been blocked by CORS policy:
   The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
*/

const DOMAIN = "http://35.227.155.59:8080/hello";
axios.defaults.withCredentials = true;
export const request = (method, url, data = undefined) => {
  let requestConfig = {
    method: method,
    //url: DOMAIN + url,
    url: DOMAIN,
    withCredentials: false,
    data: data,
  };
  //requestConfig.responseType = download ? "blob" : undefined;

  return axios(requestConfig);
};
