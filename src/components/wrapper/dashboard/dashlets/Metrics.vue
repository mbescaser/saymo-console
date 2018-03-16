<template>
    <v-card v-if="loaded" class="info-box">
        <v-layout row wrap class="ma-0 pa-0">
            <v-flex xs3 sm4 class="ma-0 pa-0">
                <div class="info-box-icon" v-metric-bgcolor="metric.icon.bgColor">
                    <v-icon>{{ metric.icon.text }}</v-icon>
                </div>
            </v-flex>
            <v-flex xs9 sm8 class="ma-0 pa-0">
                <div class="info-box-body">
                    <h1 class="info-heading">{{ metric.label }}</h1>
                    <p class="info-content">
                        <animate-increment :number="count"></animate-increment>
                    </p>
                </div>
            </v-flex>
        </v-layout>
    </v-card>
    <v-card v-else class="info-box">
        <v-layout row wrap class="ma-0 pa-0">
            <v-flex xs3 sm4 class="ma-0 pa-0">
                <div class="info-box-icon" style="height: 90px">
                    <content-placeholders>
                        <content-placeholders-img />
                    </content-placeholders>
                </div>
            </v-flex>
            <v-flex xs9 sm8 class="ma-0 pa-0">
                <div class="info-box-body" style="height: 90px;padding: 1.65rem;">
                    <content-placeholders>
                        <content-placeholders-text :lines="2" />
                    </content-placeholders>
                </div>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import dashboardService from '../dashboard.service'
import { helpers } from '@/config'

export default {
    name: 'metrics',
    props: ['metric'],
    data() {
        return {
            loaded: false,
            count: 0
        }
    },
    mounted() {
        dashboardService.getMetrics(this, this.metric.uri, '2018-03-01')
            .then(response => {
                this.loaded = !this.loaded
                this.count = response.data.count || 0
            })
            .catch(error => {
                console.log(error)
                this.loaded = !this.loaded
            })
    }
}
</script>

<style>
</style>
