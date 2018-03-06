<template>
    <div class="">
        <v-container fluid grid-list-xl class="pt-3 px-3">
            <v-layout row wrap>
                <v-flex>
                    <v-card class="px-3 py-3">
                        <table class="custom-table custom-table-bordered custom-table-text-centered">
                            <thead>
                                <tr>
                                    <th>Topic name</th>
                                    <th>Message</th>
                                    <th>Action</th>
                                    <th>Date created</th>
                                    <th>Number of flags</th>
                                    <th>Area</th>
                                    <th>Country</th>
                                    <th>Region</th>
                                    <th>State/Province</th>
                                    <th>City</th>
                                    <th>Place</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in flaggedMessages">
                                    <td>{{ row.topicName }}</td>
                                    <td>{{ row.message }}</td>
                                    <td>{{ row.action }}</td>
                                    <td>{{ row.createdAt }}</td>
                                    <td>{{ row.numberOfFlags }}</td>
                                    <td>{{ row.area }}</td>
                                    <td>{{ row.country }}</td>
                                    <td>{{ row.region }}</td>
                                    <td>{{ row.stateOrProvince }}</td>
                                    <td>{{ row.city }}</td>
                                    <td>{{ row.place }}</td>
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
    props: ['titles'],
    data() {
        return {
            title: 'Flagged Messages',
            breadcrumbs: [{
                label: 'Messages',
                to: '/messages'
            }, {
                label: 'Flagged Topics',
                to: '/messages/flagged'
            }],
            flaggedMessages: Array.from({ length: 20 })
                .map(element => element)
                .map(element => {
                    return {
                        topicName: 'Sino ang fantasy mo sa batch mo?',
                        message: 'Ang tangi kong hiling, si Mia Tambunting',
                        action: 'DELETE',
                        createdAt: '01/12/18',
                        numberOfFlags: Math.floor((Math.random() * 10) + 1),
                        area: 'Asia',
                        region: 'Philippines',
                        stateOrProvince: 'NCR',
                        city: 'Makati',
                        place: 'UMak'
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
            title: this.title + ' - Messages',
            titleTemplate: '%s | Say.mo'
        }
    }
}
</script>

<style>
</style>
