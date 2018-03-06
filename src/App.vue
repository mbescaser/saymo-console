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
    components: {
        NprogressContainer
    }
}
</script>

<style>

</style>
