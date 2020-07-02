import axios from 'axios';
import config from './config.json';
import {withToken} from "./utils";

const fetchTriggers = () => {
  return axios.get('api/triggers', withToken(config, localStorage.getItem('auth_token')));
};

const addTrigger = (trigger_document) => {
  return axios.post('api/triggers', trigger_document, withToken(config, localStorage.getItem('auth_token')));
}

const deleteTrigger = (trigger_name) => {
  return axios.delete('api/triggers/'+trigger_name, withToken(config, localStorage.getItem('auth_token')));
}

export default {fetchTriggers, addTrigger, deleteTrigger};