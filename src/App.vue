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
        const scripts = [{
            src: 'https://use.fontawesome.com/releases/v5.0.8/js/all.js',
            defer: true
        }]
        for(const script of scripts) {
            const element = document.createElement('script')
            for(let prop in script) {
                element[prop] = script[prop]
            }
            document.head.appendChild(element)
        }
    },
    components: {
        NprogressContainer
    }
}
</script>

<style>

</style>
