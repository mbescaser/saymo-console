import axios from 'axios'
import app from '../main'
import constants from './constants'

const instance = axios.create({
    baseURL: constants.serverApi,
})

instance.interceptors.request.use(request => {
    return request;
});

instance.interceptors.response.use(
    response => {
        return response
    }, error => {
        return Promise.reject(error.response);
    }
);

export default instance
