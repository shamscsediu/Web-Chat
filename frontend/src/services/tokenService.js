const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token.refresh;
  };
  const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token.access;
  };
  const updateLocalAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.token.access = token;
    localStorage.setItem("user", JSON.stringify(user));
  };
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  const setUser = (user) => {
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  };
  const removeUser = () => {
    localStorage.removeItem("user");
  };
  const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
  };
  export default TokenService;