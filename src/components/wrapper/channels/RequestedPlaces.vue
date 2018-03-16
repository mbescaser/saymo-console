<template>
    <div class="">
        <v-container fluid grid-list-xl class="pt-3 px-3">
            <v-layout row wrap>
                <v-flex>
                    <v-card class="px-3 py-3">
                        <table class="custom-table custom-table-bordered custom-table-text-centered">
                            <thead>
                                <tr>
                                    <th>Request</th>
                                    <th>Status</th>
                                    <th>Date requested</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row of requestedPlaces">
                                    <td>{{ row.requestName }}</td>
                                    <td>{{ row.status }}</td>
                                    <td>{{ row.createdAt }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            title: 'Requested Places',
            breadcrumbs: [{
                label: 'Channels',
                to: '/channels'
            }, {
                label: 'Requested Places',
                to: '/channels/requested-places'
            }],
            requestedPlaces: Array.from({ length: 20 })
                .map(element => element)
                .map(element => {
                    return {
                        requestName: 'I hope you can add places in Osaka, Japan',
                        status: 'Requested',
                        createdAt: '01/12/18'
                    }
                })
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
    metaInfo() {
        return {
            title: this.title + ' - Channels',
            titleTemplate: '%s | Say.mo'
        }
    }
}
</script>

<style>
</style>
