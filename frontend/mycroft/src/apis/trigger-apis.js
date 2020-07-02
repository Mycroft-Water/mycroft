import axios from 'axios';
import config from './config.json';

const fetchTriggers = () => {
  return axios.get('api/triggers', config);
};
