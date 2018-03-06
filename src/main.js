// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import NProgress from 'vue-nprogress'
import App from './App'
import { axios, constants } from './config'
import helpers from './helpers'
import routes from './routes'
import store from './store'
import libs from './libs'
import './assets/sass/styles.scss'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueMeta)
Vue.use(VueAxios, axios)
Vue.use(VeeValidate, {inject: false})
Vue.use(Vuetify, {
    theme: {
        primary: '#F05426',
        secondary: '#424242',
        accent: '#2364AA',
        error: '#ff1744'
    }
})
Vue.use(NProgress, {http: false})

if(libs) {
    for(let x in libs) {
        for(let y in libs[x]) {
            switch(x) {
                case 'filters':
                    Vue.filter(y, libs[x][y])
                    break;
                case 'components':
                    Vue.component(y, libs[x][y])
                    break;
                case 'directives':
                    Vue.directive(y, libs[x][y])
                    break;
            }
        }
    }
}

if(window.localStorage) {
    const lsString = window.localStorage.getItem('saymo_console')
                        ? window.atob(window.localStorage.getItem('saymo_console'))
                        : null
    const lsObject = lsString ? JSON.parse(lsString) : null
    if(lsObject) {
        store.commit('STORE_INIT', lsObject)
    }
}


const router = new VueRouter({
    routes: routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    router.app.$vuetify.goTo(0, {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
    })
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(store.getters.get_user) {
            if(helpers.isTimedOut(store.getters.get_user.timeLoggedIn)) {
                store.dispatch('set_user', null)
                store.dispatch('set_alert_message', {
                    show: true,
                    type: 'error',
                    message: 'Your session has been timed out, please log in again to continue.'
                })
                next({path: '/login', query: {redirect: to.fullPath}})
            } else {
                const user = store.getters.get_user;
                user.timeLoggedIn = Date.now()
                store.dispatch('set_user', user)
                next()
            }
        } else {
            next({path: '/login'})
        }
    } else if(!to.matched.some(record => record.meta.requiresAuth) && ['/login', '/signup'].indexOf(to.path) !== -1) {
        if(store.getters.get_user) {
            if(helpers.isTimedOut(store.getters.get_user.timeLoggedIn)) {
                store.dispatch('set_user', null)
                store.dispatch('set_alert_message', {
                    show: true,
                    type: 'error',
                    message: 'Your session has been timed out, please log in again to continue.'
                })
                next({path: '/login', query: {redirect: to.fullPath}})
            } else {
                next({path: '/dashboard'})
            }
        } else {
            next()
        }
    } else {
        next()
    }
})

/* eslint-disable no-new */
export default new Vue({
    el: '#app',
    router,
    store,
    nprogress: new NProgress(),
    components: { App },
    template: '<App/>'
})
