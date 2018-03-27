import { constants, helpers } from '@/config'

export default {
    getAddress(context) {
        return context.axios.get('https://s3-ap-northeast-1.amazonaws.com/saymo-logs-bucket/actions/postMessage/2018-03-01/data.json')
            .then(response => {
                return helpers.handleResponse(response)
            })
            .catch(error => {
                return Promise.reject(helpers.handleResponse(error))
            })
    },
    getChannels(context, uri, url = null) {
        return context.axios.get(url || `${constants.staticApi}/channels_prod/${uri}/channels1.json`)
            .then(response => {
                return helpers.handleResponse(response)
            })
            .catch(error => {
                return Promise.reject(helpers.handleResponse(error))
            })
    },
    getChannel(context, url) {
        return context.axios.get(url)
            .then(response => {
                return helpers.handleResponse(response)
            })
            .catch(error => {
                return Promise.reject(helpers.handleResponse(error))
            })
    }
}
