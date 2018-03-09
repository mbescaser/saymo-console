<template>
    <v-app>
        <router-view />
        <nprogress-container></nprogress-container>
    </v-app>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'

export default {
    name: 'App',
    mounted() {
        const script = document.createElement('script')
        script.defer = true
        script.setAttribute('src', 'https://use.fontawesome.com/releases/v5.0.8/js/all.js')
        document.head.appendChild(script)
    },
    components: {
        NprogressContainer
    }
}
</script>

<style>

</style>
