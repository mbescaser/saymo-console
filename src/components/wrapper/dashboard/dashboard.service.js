import { helpers } from '@/config'

export default {
    getDashboard: (context, userId) => {
        const user = context.$store.getters.get_user
        const config = {
            headers: {
                'Authorization': `Bearer ${user.tokens.accessToken}`
            }
        }
        return context.axios.get(`https://jsonplaceholder.typicode.com/photos`, config)
            .then(response => {
                return helpers.handleResponse(response)
            })
            .catch(error => {
                if(error.status == 401) {
                    return helpers.refreshAccessToken(context)
                        .then(response => {
                            return this.getMetrics.apply(this, arguments)
                        })
                        .catch(error => {
                            return Promise.reject(helpers.handleResponse(error))
                        })
                }
                return Promise.reject(helpers.handleResponse(error))
            })
    },
    getMetrics: (context, uri, date) => {
        return context.axios.get(`https://s3-ap-northeast-1.amazonaws.com/saymo-logs-bucket/actions/${uri}/${date}/data.json`)
            .then(response => {
                return helpers.handleResponse(response)
            })
            .catch(error => {
                return Promise.reject(helpers.handleResponse(error))
            })
    },
    getTopTopics: (context) => {
        return context.axios.get('https://s3-ap-northeast-1.amazonaws.com/saymo-logs-bucket/actions/postMessage/2018-03-01/data.json')
            .then(response => {
                return helpers.handleResponse(response)
            })
            .catch(error => {
                return Promise.reject(helpers.handleResponse(error))
            })
    },
    getTopic: (context, url) => {
        return context.axios.get(url)
            .then(response => {
                return helpers.handleResponse(response)
            })
            .catch(error => {
                return Promise.reject(helpers.handleResponse(error))
            })
    }
}
