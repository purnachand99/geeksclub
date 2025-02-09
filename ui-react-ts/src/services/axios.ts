import axios, {AxiosRequestConfig} from "axios";
import * as config from '../config/config'
import {cleanState, getAccessToken} from "./localStorage";

const AxiosInstance = axios.create();
const configApiUrl = config.default.REACT_APP_API_BASE_URL;
console.log("localApiUrl from config: " + configApiUrl);
let apiUrl = process.env.REACT_APP_API_BASE_URL;
console.log("REACT_APP_API_BASE_URL from env: " + apiUrl);
apiUrl = apiUrl || configApiUrl;
console.log("Effective REACT_APP_API_BASE_URL from env: " + apiUrl);
AxiosInstance.defaults.baseURL = apiUrl;

// Set the AUTH token for any request
AxiosInstance.interceptors.request.use(function(axiosConfig: AxiosRequestConfig) {
    const accessToken = getAccessToken();
    if (axiosConfig.headers && !axiosConfig.headers?.Authorization && accessToken) {
      axiosConfig.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return axiosConfig;
});

// Add a response interceptor
AxiosInstance.interceptors.response.use((response) => {
        return response;
    },
    (error) => {
      console.log(error);
      let response = error.response;
        if (error.response.status === 401 || error.response.status === 403) {
            cleanState();
            if(response.config.url !== "/api/auth/login") {
              window.location.href = "/login";
            }
        }/* else {
            return Promise.reject(error);
        }*/
      return Promise.reject(error);
    }
);

export default AxiosInstance;
