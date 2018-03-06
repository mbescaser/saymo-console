<template>
    <div>
        <router-view />
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return { }
    },
    mounted() {
        this.$store.dispatch('set_active_link_group', 'Topics')
    },
    beforeDestroy() {
        this.$store.dispatch('set_active_link_group', null)
    },
    computed: {
        ...mapGetters({
            user: 'get_user'
        })
    }
}
</script>

<style>
</style>
