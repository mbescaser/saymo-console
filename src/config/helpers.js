import constants from './constants'

export default {
    // Arrays ------------------------------------------------------------------
    first: (values, count = 1) => {
        return values != null && values.length && count > 0
            ? (count == 1
                ? values.slice(0, count)[count - 1]
                : values.slice(0, count))
            : null
    },
    last: (values, count = 1) => {
        return values != null && values.length && count > 0
            ? (count == 1
                ? values.slice(-count)[count - 1]
                : values.slice(-count))
            : null
    },
    unique: (values, propName = null) => {
        return values != null && values.length
            // ? values.some((elem) => typeof elem !== 'object') && propName != null
            ? propName != null
                ? values.filter((elem1, pos, self) => self.findIndex((elem2) => elem2[propName] === elem1[propName]) === pos)
                : values.filter((elem, index, self) => index === self.indexOf(elem))
            : null
    },
    // Strings -----------------------------------------------------------------
    capitalize: (value) => {
        return typeof value === 'string'
            ? value.replace(/\b\w/g, function(l){ return l.toUpperCase() })
            : value
    },
    camelCase: (value) => {
        return typeof value === 'string'
            ? value.replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
                .replace(/\s/g, '')
                .replace(/^(.)/, function($1) { return $1.toLowerCase(); })
            : value
    },
    // Functions ---------------------------------------------------------------
    handleResponse: (response) => {
        const handledResponse = {
            code: response.status ? response.status : 0,
            headers: response.headers != null ? response.headers : null,
            customCode: null,
            data: null,
            message: null
        }
        if(response.status && constants.validStatusCodes.indexOf(response.status) !== -1) {
            handledResponse.customCode = response.data && response.data.customCode ? response.data.customCode : 0
            handledResponse.data = response.data != null ? response.data : null
        } else {
            handledResponse.customCode = response.data
                ? (response.data.customCode
                    ? response.data.customCode
                    : (response.data.errorCode
                        ? response.data.errorCode
                        : 0))
                : 0
            handledResponse.message = response.data
                ? (response.data.message
                    ? response.data.message
                    : (response.data.errorMessage
                        ? response.data.errorMessage
                        : null))
                : null
        }
        return handledResponse
    },
    refreshAccessToken: (context) => {
        const user = context.$store.getters.get_user ? context.$store.getters.get_user : null
        return context.axios.post(`oauth/token`, {
                refreshToken: user && user.tokens && user.tokens.refreshToken != null ? user.tokens.refreshToken : null
            })
            .then(response => {
                if(response && constants.validStatusCodes.indexOf(response.status) !== -1) {
                    user.tokens = response.data
                    context.$store.dispatch('set_user', user)
                }
                return Promise.resolve(response)
            })
            .catch(error => {
                if(error.status == 403) {
                    context.$router.push('/logout')
                } else {
                    return Promise.reject(error)
                }
            })
    },
    isTimedOut: (timeLoggedIn) => {
        return timeLoggedIn ? Math.floor((Date.now() / 1000) - (timeLoggedIn / 1000)) > constants.sessionLifetime : true
    },
    isNumeric: (value) => {
        return Number.isNan(value) != false
    },
    isEmpty: (value) => {
        if(value) {
            for(let x in value) {
                if(value.hasOwnProperty(x)) {
                    return false
                }
            }
        }
        return true
    }
}
