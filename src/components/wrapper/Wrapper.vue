<template>
    <div class="">
        <v-navigation-drawer v-bind="drawerOps" v-model="drawer.show" app fixed>
            <v-list>
                <template v-for="(link, index) in drawer.links">
                    <v-list-group
                        v-if="link.subs"
                        :value="activeLinkGroup == link.label"
                        :key="index"
                        :prepend-icon="link.icon"
                        no-action>
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ link.label }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile
                            v-if="link.subs"
                            v-for="(sub, index) in link.subs"
                            :key="index"
                            :to="sub.to"
                            exact>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ sub.label }}</v-list-tile-title>
                            </v-list-tile-content>
                            <!-- <v-list-tile-action>
                                <v-icon>{{ sub.icon }}</v-icon>
                            </v-list-tile-action> -->
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else :key="index" :to="link.to">
                        <v-list-tile-action>
                            <v-icon>{{ link.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ link.label }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar v-bind="toolbarOps" color="primary" dark app fixed>
            <v-toolbar-side-icon @click.stop="drawer.show = !drawer.show"></v-toolbar-side-icon>
            <v-toolbar-title>Say.Mo</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-card class="mx-3 mt-4 mb-2">
                <v-breadcrumbs>
                    <v-icon slot="divider">chevron_right</v-icon>
                    <v-breadcrumbs-item
                        v-for="(breadcrumb, index) in breadcrumbs"
                        :key="index"
                        :to="breadcrumb.to" exact>
                        {{ breadcrumb.label }}
                    </v-breadcrumbs-item>
                </v-breadcrumbs>
            </v-card>
            <router-view />
        </v-content>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            drawer: {
                show: true,
                links: [{
                    label: 'Dashboard',
                    icon: 'dashboard',
                    to: '/dashboard'
                }, {
                    label: 'Channels',
                    icon: 'location_on',
                    to: '/channels',
                    subs: [{
                        label: 'All',
                        to: '/channels'
                    }, {
                        label: 'Requested Places',
                        to: '/channels/requested-places'
                    }, {
                        label: 'Create',
                        to: '/channels/create'
                    }]
                }, {
                    label: 'Topics',
                    icon: 'message',
                    to: '/topics',
                    subs: [{
                        label: 'All',
                        to: '/topics'
                    }, {
                        label: 'Flagged',
                        to: '/topics/flagged'
                    }, {
                        label: 'Create',
                        to: '/topics/create'
                    }]
                }, {
                    label: 'Messages',
                    icon: 'sms',
                    to: '/messages',
                    subs: [{
                        label: 'Flagged',
                        to: '/messages/flagged'
                    }]
                }, {
                    label: 'Logout',
                    icon: 'exit_to_app',
                    to: '/logout'
                }]
            }
        }
    },
    computed: {
        ...mapGetters({
            title: 'get_title',
            activeLinkGroup: 'get_active_link_group',
            breadcrumbs: 'get_breadcrumbs'
        }),
        drawerOps() {
            return {
                clipped: this.$vuetify.breakpoint.mdAndUp ? true : false
            }
        },
        toolbarOps() {
            return {
                'clipped-left': this.$vuetify.breakpoint.mdAndUp ? true : false
            }
        }
    }
}
</script>

<style>

</style>
