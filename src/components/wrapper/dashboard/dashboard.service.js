import helpers from '../../../helpers'

export default {
    getDashboardMetrics: (context, userId) => {
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
                            return this.getDashboardMetrics.apply(this, arguments)
                        })
                        .catch(error => {
                            return Promise.reject(helpers.handleResponse(error))
                        })
                }
                return Promise.reject(helpers.handleResponse(error))
            })
    }
}
