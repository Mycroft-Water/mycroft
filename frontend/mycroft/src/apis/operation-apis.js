import axios from 'axios';
import config from './config.json';
import { withToken } from './utils';

const fetchOperations = () => {
  return axios.get(
    'api/operations',
    withToken(config, localStorage.getItem('auth_token'))
  );
};

const addOperation = (operation_document) => {
  return axios.post(
    'api/operations',
    operation_document,
    withToken(config, localStorage.getItem('auth_token'))
  );
};

const deleteOperation = (operation_name) => {
  return axios.delete(
    'api/operations/' + operation_name,
    withToken(config, localStorage.getItem('auth_token'))
  );
};

export default { fetchOperations, addOperation, deleteOperation };
