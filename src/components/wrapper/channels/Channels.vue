<template>
    <div class="">
        <v-container fluid grid-list-xl class="pt-3 px-3">
        </v-container>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            title: 'Channels',
            breadcrumbs: [{
                label: 'Channels',
                to: '/channels'
            }],
        }
    },
    mounted() {
        this.$store.dispatch('set_title', 'Channels')
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
            title: this.title,
            titleTemplate: '%s | Say.mo'
        }
    }
}
</script>

<style>
</style>
