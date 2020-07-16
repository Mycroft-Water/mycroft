import axios from 'axios';
import config from './config.json';
import { withToken } from './utils';

const fetchTasks = () => {
  return axios.get(
    'api/tasks',
    withToken(config, localStorage.getItem('auth_token'))
  );
};

const addTask = (task_document) => {
  return axios.post(
    'api/tasks',
    task_document,
    withToken(config, localStorage.getItem('auth_token'))
  );
};

const deleteTask = (task_name) => {
  return axios.delete(
    'api/tasks/' + task_name,
    withToken(config, localStorage.getItem('auth_token'))
  );
};

export default { fetchTasks, addTask, deleteTask };
