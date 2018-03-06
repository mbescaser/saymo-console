import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        alertMessage: null,
        activeLinkGroup: null,
        breadcrumbs: [{
            label: 'Home',
            to: '/'
        }]
    },
    getters: {
        get_user(state) {
            return state.user
        },
        get_alert_message(state) {
            return state.alertMessage
        },
        get_active_link_group(state) {
            return state.activeLinkGroup
        },
        get_breadcrumbs(state) {
            return state.breadcrumbs
        }
    },
    mutations: {
        // STORE_INIT(oldState, newState) {
        //     this.replaceState(Object.assign(oldState, newState))
        // },
        STORE_INIT(state, user) {
            state.user = user
        },
        SET_USER(state, user) {
            state.user = user
            if(user) {
                window.localStorage.setItem('saymo_console', window.btoa(JSON.stringify(user)))
            } else {
                window.localStorage.removeItem('saymo_console')
            }
        },
        SET_ALERT_MESSAGE(state, alertMessage) {
            state.alertMessage = alertMessage
        },
        SET_ACTIVE_LINK_GOUP(state, activeLinkGroup) {
            state.activeLinkGroup = activeLinkGroup
        },
        SET_BREADCRUMBS(state, breadcrumbs) {
            state.breadcrumbs = breadcrumbs
        }
    },
    actions: {
        set_user({ commit }, user) {
            commit('SET_USER', user)
        },
        set_alert_message({ commit }, alertMessage) {
            commit('SET_ALERT_MESSAGE', alertMessage)
        },
        set_active_link_group({ commit }, activeLinkGroup) {
            commit('SET_ACTIVE_LINK_GOUP', activeLinkGroup)
        },
        set_breadcrumbs({ commit }, breadcrumbs) {
            commit('SET_BREADCRUMBS', breadcrumbs)
        }
    }
})
