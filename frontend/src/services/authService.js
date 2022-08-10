import api from "./api";
import TokenService from "./tokenService";

const register = (username, email, password) => {
  return api.post("/user/authenticate", {
    username,
    email,
    password
  });
};

const login = (email, password) => {
  return api
    .post("/user/authenticate", {
      email,
      password
    })
    .then((response) => {
      if (response.data.results.token.access) {
        TokenService.setUser(response.data.results);
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;