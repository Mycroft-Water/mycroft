const withToken = (config, token) => {
  return { ...config, headers: { Authorization: `Token ${token}` } };
};

const withParams = (config, params) => {
  return { ...config, params: params };
};

const getToken = () => {
  return localStorage.getItem('token');
};

export { withToken, withParams, getToken };
