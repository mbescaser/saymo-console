import axios from 'axios'
import app from '../main'
import constants from './constants'

const instance = axios.create({
    baseURL: constants.apiURL,
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
