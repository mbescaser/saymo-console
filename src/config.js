import * as instance from 'axios'
import app from './main'

const constants = {
    // apiURL: 'https://jsonplaceholder.typicode.com/'
    // apiURL: 'http://rakk-server-dev.ap-northeast-1.elasticbeanstalk.com/api/v1/'
    apiURL: 'http://saymousers.btsolve.com/api/v1/',
    validStatusCodes: [200, 201, 202, 204, 304],
    sessionLifetime: 10 // 2hrs (in seconds)
}

const axios = instance.create({
    baseURL: constants.apiURL,
})

axios.interceptors.request.use(request => {
    return request;
});

axios.interceptors.response.use(
    response => {
        return response
    }, error => {
        return Promise.reject(error.response);
    }
);

export {
    axios,
    constants
}
