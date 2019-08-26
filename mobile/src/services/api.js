import axios from 'axios';
import {API_HOST} from 'react-native-dotenv';

const api = axios.create({
  baseURL: API_HOST,
});

export default api;
