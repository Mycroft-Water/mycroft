import axios from 'axios';
import config from './config.json';

const login = (username, password) => {
  return axios.post(
    '/api/login',
    { username: username, password: password },
    config
  );
};

const register = (username, password) => {
  return axios.post(
    '/api/register',
    { username: username, password: password },
    config
  );
};

export default { login, register };
