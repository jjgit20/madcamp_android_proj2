import {BACKEND_URL} from '@env';
import axios, {AxiosError, AxiosInstance} from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async config => {
    const userSession = await EncryptedStorage.getItem('user_session');
    const token = userSession && JSON.parse(userSession).token;

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      config.withCredentials = true;
    }
    return config;
  },
  (error: AxiosError | Error): Promise<AxiosError> => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
