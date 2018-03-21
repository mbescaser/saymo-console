<template>
    <div class="">
        <v-container fluid grid-list-xl class="pt-3 px-3">
            <v-card class="pa-3 mb-3">
                <v-layout row wrap v-if="map.center">
                    <v-flex xs12>
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
                    <v-flex xs12>
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
                    </v-flex>
                </v-layout>
                <v-layout row wrap v-else>
                    <v-flex xs12>
                        <gmap-autocomplete style="width: 100%;outline: 0;" @place_changed="setPlace($event)"></gmap-autocomplete>
                    </v-flex>
                </v-layout>
            </v-card>
            <v-card v-if="map.center" class="pa-3 mb-3">
                <v-layout row wrap>
                    {{ map.center }}
                    {{ map.address }}
                </v-layout>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { constants, helpers } from '@/config'

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
            this.map.marker = {
                lat: latlng.lat(),
                lng: latlng.lng()
            }
        },
        mapDragend(latlng) {
            this.map.center = {
                lat: latlng.lat(),
                lng: latlng.lng()
            }
            const geocoder = new google.maps.Geocoder
            geocoder.geocode({location: this.map.center}, function(result, status) {
                if(status === 'OK' && result && result.length > 0) {
                    this.map.address = helpers.first(result) ? helpers.first(result).formatted_address : null
                }
            }.bind(this))
        },
        resetPlace() {
            this.map = {
                center: null,
                marker: null,
                address: null
            }
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
