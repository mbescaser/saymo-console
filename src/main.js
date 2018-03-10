// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import VueAxios from 'vue-axios'
import VueContentPlaceholders from 'vue-content-placeholders'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import NProgress from 'vue-nprogress'
import {
    axios,
    constants,
    helpers,
    routes,
    store,
    libs
} from './config'
import App from './App'
import './assets/sass/styles.scss'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueMeta)
Vue.use(VueAxios, axios)
Vue.use(VueContentPlaceholders)
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
    for(let lib in libs) {
        for(let entity in libs[lib]) {
            switch(lib) {
                case 'filters':
                    Vue.filter(entity, libs[lib][entity])
                    break;
                case 'components':
                    Vue.component(entity, libs[lib][entity])
                    break;
                case 'directives':
                    Vue.directive(entity, libs[lib][entity])
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
    } else if(to.matched.some(record => record.meta.guest)) {
        if(store.getters.get_user) {
            next({path: '/dashboard'})
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
