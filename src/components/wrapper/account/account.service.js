import { helpers } from '@/config'

export default {
    postLogin(context, username, password) {
        const config = {
            auth: {
                username: username,
                password: password
            }
        }
        return context.axios.post(`users/login`, {}, config)
            .then(response => {
                return helpers.handleResponse(response)
            })
            .catch(error => {
                return Promise.reject(helpers.handleResponse(error))
            })
    },
    getUser(context, userId = null) {
        const user = context.$store.getters.get_user
        const config = {
            headers: {
                'Authorization': `Bearer ${user.tokens.accessToken}`
            }
        }
        userId = userId || user.details.userId
        return context.axios.get(`auth/users/${userId}`, config)
            .then(response => {
                return helpers.handleResponse(response)
            })
            .catch(error => {
                if(error.status == 401) {
                    return helpers.refreshAccessToken(context)
                        .then(response => {
                            return this.getUser.apply(this, arguments)
                        })
                        .catch(error => {
                            return Promise.reject(helpers.handleResponse(error))
                        })
                }
                return Promise.reject(helpers.handleResponse(error))
            })
    }
}
