<template>
    <div class="">
        <v-container fluid grid-list-xl class="pt-3 px-3">
            <v-layout row wrap>
                <v-flex v-for="(metric, index) in metrics" :key="index" xs12 sm6 md4>
                    <v-card class="info-box">
                        <v-layout row wrap class="ma-0 pa-0">
                            <v-flex xs3 sm4 class="ma-0 pa-0">
                                <div class="info-box-icon" :style="{'background-color': metric.icon.bgColor}">
                                    <v-icon>{{ metric.icon.text }}</v-icon>
                                </div>
                            </v-flex>
                            <v-flex xs9 sm8 class="ma-0 pa-0">
                                <div class="info-box-body ">
                                    <h1 class="info-heading">{{ metric.name }}</h1>
                                    <p class="info-content">
                                        <animate-increment :number="metric.value"></animate-increment>
                                    </p>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import dashboardService from './dashboard.service'
import helpers from '../../../helpers'

export default {
    data() {
        return {
            title: 'Dashboard',
            breadcrumbs: [{
                label: 'Dashboard',
                to: '/dashboard'
            }],
            metrics: [{
                name: 'Flagged Topics',
                icon: {
                    bgColor: '#00C0EF',
                    text: 'message'
                },
                value: Math.floor((Math.random() * 10000000) + 1)
            }, {
                name: 'Flagged Messages',
                icon: {
                    bgColor: '#F39C12',
                    text: 'sms'
                },
                value: Math.floor((Math.random() * 10000000) + 1)
            }, {
                name: 'Requested Places',
                icon: {
                    bgColor: '#00A65A',
                    text: 'add_location'
                },
                value: Math.floor((Math.random() * 10000000) + 1)
            }]
        }
    },
    mounted() {
        this.appBreadcrumbs.push(...this.breadcrumbs)
        dashboardService.getDashboardMetrics(this)
            .then(response => {
                console.log(helpers.last(response.data))
                this.$nprogress.done()
            })
            .catch(error => {
                console.log(error)
                this.$nprogress.done()
            })
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
