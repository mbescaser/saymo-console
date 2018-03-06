<template>
    <div class="">
        <v-container fluid grid-list-xl class="pt-3 px-3">
            <v-layout row wrap>
                <v-flex>
                    <v-card class="px-3 py-3">
                        <form @submit.prevent="formSubmit()" novalidate>
                            <v-container grid-list-lg class="py-0 px-0">
                                <v-layout v-bind="areaLayoutOps" wrap>
                                    <v-flex>
                                        <v-select
                                            :items="items"
                                            item-text="name"
                                            item-value="value"
                                            data-vv-name="region"
                                            :error-messages="errors.collect('region')"
                                            v-validate="{required: true}"
                                            v-model="topic.region"
                                            label="Region"
                                            required>
                                        </v-select>
                                    </v-flex>
                                    <v-flex>
                                        <v-select
                                            v-if="topic.region"
                                            :items="items"
                                            item-text="name"
                                            item-value="value"
                                            v-model="topic.country"
                                            label="Country">
                                        </v-select>
                                    </v-flex>
                                    <v-flex>
                                        <v-select
                                            v-if="topic.region && topic.country"
                                            :items="items"
                                            item-text="name"
                                            item-value="value"
                                            v-model="topic.stateOrProvince"
                                            label="State/Province">
                                        </v-select>
                                    </v-flex>
                                    <v-flex >
                                        <v-select
                                            v-if="topic.region && topic.country && topic.stateOrProvince"
                                            :items="items"
                                            item-text="name"
                                            item-value="value"
                                            v-model="topic.city"
                                            label="City">
                                        </v-select>
                                    </v-flex>
                                    <v-flex>
                                        <v-select
                                            v-if="topic.region && topic.country && topic.stateOrProvince && topic.city"
                                            :items="items"
                                            item-text="name"
                                            item-value="value"
                                            v-model="topic.channel"
                                            label="Channel">
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex>
                                        <v-text-field
                                            name="topic.name"
                                            label="Name"
                                            data-vv-name="name"
                                            :error-messages="errors.collect('name')"
                                            v-validate="{required: true}"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex>
                                        <v-text-field
                                            multi-line
                                            v-model="topic.description"
                                            data-vv-name="description"
                                            :error-messages="errors.collect('description')"
                                            v-validate="{required: true}"
                                            required>
                                            <div slot="label">Description*</div>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat color="accent" @click="formReset()">Reset</v-btn>
                                <v-btn color="primary">Submit</v-btn>
                            </v-card-actions>
                        </form>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

const topic = {
    region: null,
    country: null,
    stateOrProvince: null,
    city: null,
    channel: null,
    name: null,
    description: null
}

export default {
    inject: ['$validator'],
    $_veeValidate: {
        validator: 'new'
    },
    data() {
        return {
            title: 'Create Topic',
            breadcrumbs: [{
                label: 'Topics',
                to: '/topics'
            }, {
                label: 'Create Topic',
                to: '/topics/create'
            }],
            topic: Object.assign({}, topic),
            items: ['Asia', 'Africa', 'North America', 'South America', 'Europe', 'Australia', 'Antartica'].map(element => {
                return {
                    name: element,
                    value: element.toLowerCase().replace(' ', '-')
                }
            })
        }
    },
    mounted() {
        this.$store.dispatch('set_title', 'Topics')
        this.appBreadcrumbs.push(...this.breadcrumbs)
    },
    beforeDestroy() {
        this.appBreadcrumbs.splice(-this.breadcrumbs.length, this.breadcrumbs.length)
    },
    watch: {
        'topic.region': function() {
            this.topic = Object.assign(this.topic, {country: null, stateOrProvince: null, city: null, channel: null})
        },
        'topic.country': function() {
            this.topic = Object.assign(this.topic, {stateOrProvince: null, city: null, channel: null})
        },
        'topic.stateOrProvince': function() {
            this.topic = Object.assign(this.topic, {city: null, channel: null})
        },
        'topic.channel': function() {
            this.topic = Object.assign(this.topic, {channel: null})
        }
    },
    methods: {
        formSubmit() {
            this.$validator.validateAll().then(result => {
                if(result) {

                } else {

                }
            })
        },
        formReset() {
            this.topic = Object.assign({}, topic)
        }
    },
    computed: {
        ...mapGetters({
            user: 'get_user',
            appBreadcrumbs: 'get_breadcrumbs'
        }),
        areaLayoutOps() {
            return {
                column: this.$vuetify.breakpoint.xs ? true : false
            }
        }
    },
    metaInfo() {
        return {
            title: this.title + ' - Topics',
            titleTemplate: '%s | Say.mo'
        }
    }
}
</script>

<style>
</style>
