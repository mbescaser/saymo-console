<template>
    <div class="">
        <v-container fluid grid-list-xl class="pt-3 px-3">
            <v-layout row wrap>
                <v-flex v-for="(metric, index) of metrics" :key="metric.label" xs12 sm6 md4>
                    <metrics :metric="metric"></metrics>
                </v-flex>
                <v-flex xs12>
                    <top-topics></top-topics>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { helpers } from '@/config'
import dashboardService from './dashboard.service'
import Metrics from './dashlets/Metrics'
import TopTopics from './dashlets/TopTopics'

export default {
    data() {
        return {
            title: 'Dashboard',
            breadcrumbs: [{
                label: 'Dashboard',
                to: '/dashboard'
            }],
            metrics: [{
                icon: {
                    text: 'fas fa-user-plus',
                    bgColor: '#00C0EF',
                },
                label: 'Register',
                uri: 'register'
            }, {
                icon: {
                    text: 'fas fa-check',
                    bgColor: '#00A65A',
                },
                label: 'Activate',
                uri: 'activate'
            }, {
                icon: {
                    text: 'fas fa-sign-in-alt',
                    bgColor: '#00C4A7',
                },
                label: 'Login',
                uri: 'login'
            }, {
                icon: {
                    text: 'fas fa-lock',
                    bgColor: '#FFC824',
                },
                label: 'Forgot Password',
                uri: 'forgotPass'
            }, {
                icon: {
                    text: 'fas fa-lock',
                    bgColor: '#FF6666',
                },
                label: 'Change Password',
                uri: 'changePassword'
            }, {
                icon: {
                    text: 'fas fa-user-circle',
                    bgColor: '#276CDA',
                },
                label: 'Change Icon',
                uri: 'changeIcon'
            }, {
                icon: {
                    text: 'fas fa-user',
                    bgColor: '#FFDB4A',
                },
                label: 'Change Alias',
                uri: 'changeAlias'
            }, {
                icon: {
                    text: 'fas fa-sign-out-alt',
                    bgColor: '#cc0000',
                },
                label: 'Logout',
                uri: 'logout'
            }]
        }
    },
    mounted() {
        this.appBreadcrumbs.push(...this.breadcrumbs)
    },
    beforeDestroy() {
        this.appBreadcrumbs.splice(-this.breadcrumbs.length, this.breadcrumbs.length)
    },
    computed: {
        ...mapGetters({
            user: 'get_user',
            appBreadcrumbs: 'get_breadcrumbs'
        })
    },
    components: {
        Metrics,
        TopTopics
    },
    metaInfo() {
        return {
            title: this.title,
            titleTemplate: '%s | Say.mo'
        }
    }
}
</script>

<style>

</style>
