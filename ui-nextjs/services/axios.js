import axios from "axios";
import {cleanState, getAccessToken} from "./localStorage";

const instance = axios.create();
let apiUrl = process.env.API_BASE_URL;
console.log("API_BASE_URL : " + apiUrl);
instance.defaults.baseURL = apiUrl;

// Set the AUTH token for any request
instance.interceptors.request.use(function(config) {
    const accessToken = getAccessToken();
    if (!config.headers.Authorization && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
        return response;
    },
    (error) => {
      console.log("error",error);
      let response = error.response;
      console.log("response:", response);
      //console.log("config:", response.config);
      //console.log("request:", response.request);
        if (response && response.status === 401 || response.status === 403) {
            cleanState();
            if(!(response.config.url ==="/api/auth/login")) {
              //window.location = "/login";
            }
        }/* else {
            return Promise.reject(error);
        }*/
      return Promise.reject(error);
    }
);

export default instance;
