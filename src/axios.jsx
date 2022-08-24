import axios from "axios";

const DOMAIN = "http://35.247.33.79:8080";
axios.defaults.withCredentials = true;
export const request = (method, url, data = undefined) => {
  let requestConfig = {
    method: method,
    url: DOMAIN + url,
    withCredentials: true,
    data: data,
  };
  //requestConfig.responseType = download ? "blob" : undefined;

  return axios(requestConfig);
};
