import axios from "axios";
import TokenService from "./tokenService";
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
      //   config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
let refresh = false;
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    // Access Token was expired
    if (err.response.status === 401 && !refresh) {
      refresh = true;
      const rs = await instance.post("/token/refresh", {
        refresh: TokenService.getLocalRefreshToken(),
      });

      if (rs.status === 200) {
        const accessToken = rs.data.access;
        TokenService.updateLocalAccessToken(accessToken);
        return instance(err.config);
      } else {
        console.log("refresh token failed");
        let dispatch = useDispatch();
        dispatch(logout());
      }
    }
    refresh = false;
    console.log("refresh token failed");
    // TokenService.removeUser();
    window.location.reload();
    return Promise.reject(err);
  }
);
export default instance;
