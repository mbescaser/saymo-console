<template>
    <div class="">
        <v-container fluid grid-list-xl class="pt-3 px-3">
            <v-card class="pa-3 mb-3">
                <v-layout row wrap>
                    <v-flex v-if="map.center" xs12>
                        <v-card-title class="pa-0">
                            <span>{{ map.address }}</span>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="accent"
                                class="ma-0"
                                small
                                @click="resetPlace()">
                                Change
                            </v-btn>
                        </v-card-title>
                    </v-flex>
                    <v-flex v-else xs12>
                        <gmap-autocomplete style="width: 100%;outline: 0; height:28px;" @place_changed="setPlace($event)"></gmap-autocomplete>
                    </v-flex>
                </v-layout>
            </v-card>
            <v-layout row wrap v-if="channelsTable.items">
                <v-flex sm12 md4>
                    <v-card class="pa-3 mb-3">
                        <gmap-map
                            :center="map.center"
                            :zoom="14"
                            @drag="mapDrag($refs.map.$mapObject.getCenter())"
                            @dragend="mapDragend($refs.map.$mapObject.getCenter())"
                            ref="map"
                            map-type-id="terrain"
                            style="width: 100%; height: 400px">
                            <gmap-marker :position="map.marker"></gmap-marker>
                        </gmap-map>
                    </v-card>
                </v-flex>
                <v-flex sm12 md8>
                    <v-card class="mb-3" style="max-height: 500px;overflow-y: auto;">
                        <v-data-table
                            :headers="channelsTable.headers"
                            :items="channelsTable.items"
                            hide-actions>
                            <template slot="items" slot-scope="props">
                                <tr v-if="props.item.channel">
                                    <td>{{ props.index + 1 }}</td>
                                    <td>{{ props.item.channel.displayName }}</td>
                                    <td>{{ props.item.channel.description }}</td>
                                </tr>
                                <tr v-else>
                                    <td v-for="i in channelsTable.headers.length">
                                        <content-placeholders centered>
                                            <content-placeholders-text :lines="1" />
                                        </content-placeholders>
                                    </td>
                                </tr>
                            </template>
                        </v-data-table>
                        <div v-if="channelsTable.nextSet" class="text-sm-center my-3">
                            <v-btn
                                @click="getNextSet(channelsTable.nextSet)"
                                color="primary"
                                outline
                                round>
                                Next Items
                            </v-btn>
                        </div>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { constants, helpers } from '@/config'
import channelService from './channels.service'

export default {
    data() {
        return {
            title: 'Channels',
            breadcrumbs: [{
                label: 'Channels',
                to: '/channels'
            }],
            map: {
                center: null,
                marker: null,
                address: null
            },
            channelsTable: {
                selected: [],
                headers: [{
                    text: '#',
                    sortable: false,
                    width: '10%'
                }, {
                    text: 'Name',
                    sortable: false,
                    value: 'name',
                    width: '50%'
                }, {
                    text: 'Description',
                    sortable: false,
                    value: 'description',
                    width: '40%'
                }],
                items: null,
                nextSet: null
            }
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
    watch: {
        'map.center': function(newValue, oldValue) {
            if(newValue) {
                channelService.getChannels(this, helpers.generateLatLongUri(newValue.lat, newValue.lng))
                    .then(response => {
                        const channelList = response.data.channelList || []
                        if(channelList && channelList.length > 0) {
                            this.channelsTable.items = channelList
                            this.channelsTable.nextSet = response.data.nextSet ? response.data.nextSet.shift() : null
                            this.getChannel(this.channelsTable.items)
                        }
                    })
                    .catch(error => {
                        this.channelsTable.items = []
                    })
            }
        }
    },
    methods: {
        setPlace(place) {
            this.map.address = place.formatted_address
            this.map.center = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            }
            this.map.marker = Object.assign({}, this.map.center)
        },
        mapDrag(latlng) {
            this.map.marker = {lat: latlng.lat(), lng: latlng.lng() }
        },
        mapDragend(latlng) {
            this.map.center = {lat: latlng.lat(), lng: latlng.lng()}
            const geocoder = new google.maps.Geocoder
            geocoder.geocode({location: this.map.center}, function(result, status) {
                if(status === 'OK' && result && result.length > 0) {
                    this.map.address = helpers.first(result) ? helpers.first(result).formatted_address : null
                }
            }.bind(this))
        },
        resetPlace() {
            this.map = {center: null, marker: null, address: null}
            this.channelsTable.items = null
        },
        async getChannel(channels, start = 0) {
            for(let i = start; i < channels.length; i++) {
                try {
                    const response = await channelService.getChannel(this, channels[i])
                    channels.splice(i, 1, Object.assign({}, {url: channels[i], channel: response.data || []}))
                } catch (e) {
                    channels.splice(i, 1)
                    i--
                }
            }
        },
        getNextSet(nextSet) {
            channelService.getChannels(this, null, nextSet)
                .then(response => {
                    const channelList = response.data.channelList || []
                    if(channelList && channelList.length > 0) {
                        // this.channelsTable.items = this.channelsTable.items.concat(channelList)
                        this.channelsTable.items.push(...channelList)
                        this.channelsTable.nextSet = response.data.nextSet ? response.data.nextSet.shift() : null
                        this.getChannel(this.channelsTable.items, this.channelsTable.items.length - channelList.length)
                    }
                })
                .catch(error => {
                    this.channelsTable.items = []
                })
        }
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
