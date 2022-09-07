import api from "./api";
import TokenService from "./tokenService";

const register = (first_name, last_name, username, email, password) => {
  return api.post("/user/register", {
    first_name,
    last_name,
    username,
    email,
    password
  }).then((response) => {
    console.log(response.data)
    return response.data;
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