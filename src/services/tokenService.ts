const TOKEN_KEY = "authToken";

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export { getToken, setToken, clearToken };
