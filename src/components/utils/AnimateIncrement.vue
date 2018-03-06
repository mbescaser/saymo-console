<template>
    <span>{{ displayNumber | abbreviateNumbers(precision) }}</span>
</template>

<script>
export default {
    name: 'animate-increment',
    props: {
        number: {type: Number, default: 0},
        precision: {type: Number, default: 1},
        speed: {type: Number, default: 20}
    },
    created() {
        this.run()
    },
    data() {
        return {
            displayNumber: 0,
            interval: null
        }
    },
    watch: {
        number() {
            this.run()
        }
    },
    methods: {
        run() {
            this.animateIncrement()
            this.interval = window.setInterval(function() {
                this.animateIncrement()
            }.bind(this), this.speed)
        },
        animateIncrement() {
            if(this.number != this.displayNumber) {
                var change = (this.number - this.displayNumber) / 10;
                change = change >= 0 ? Math.ceil(change) : Math.floor(change)
                this.displayNumber = this.displayNumber + change
            } else {
                window.clearInterval(this.interval)
                this.interval = null
            }
        }
    }
}
</script>

<style>
</style>
