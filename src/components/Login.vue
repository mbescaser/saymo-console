<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm6 md4>
                <v-card class="elevation-10">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    <div class="pa-3">
                        <v-alert :type="alert.type" outline dismissible class="mb-3" v-model="alert.show">{{ alert.message }}</v-alert>
                        <form @submit.prevent="formSubmit()" novalidate>
                            <v-text-field
                                v-model="email"
                                label="E-mail"
                                :error-messages="errors.collect('email')"
                                v-validate="{required: true, email: false}"
                                data-vv-name="email"
                                prepend-icon="person"
                                required
                                :disabled="loggingIn"
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                label="Password"
                                :error-messages="errors.collect('password')"
                                v-validate="{required: true}"
                                data-vv-name="password"
                                prepend-icon="lock"
                                type="password"
                                required
                                :disabled="loggingIn"
                            ></v-text-field>
                            <v-card-actions class="mt-2">
                                <v-layout align-center justify-center>
                                    <v-flex xs4>
                                        <v-btn
                                            block
                                            type="submit"
                                            color="primary"
                                            class="mx-0 my-0"
                                            :disabled="loggingIn">
                                            <v-progress-circular v-if="loggingIn" indeterminate :size="20" color="white"></v-progress-circular>
                                            <span v-else>Login</span>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-card-actions>
                        </form>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { Validator } from 'vee-validate'
import { mapGetters, mapMutations } from 'vuex'
import accountService from './wrapper/account/account.service'

const alert = {
    show: false,
    type: null,
    message: null
}

export default {
    $_veeValidate: {
        validator: 'new'
    },
    data() {
        return {
            title: 'Login',
            alert: Object.assign({}, alert),
            email: null,
            password: null,
            loggingIn: false
        }
    },
    created() {
        const alertMessage = this.$store.getters.get_alert_message
        if(alertMessage) {
            this.alert = Object.assign(this.alert, alertMessage)
            this.$store.dispatch('set_alert_message', null)
        }
    },
    computed: {
        ...mapGetters({
            user: 'get_user'
        }),
    },
    methods: {
        formSubmit() {
            this.alert = Object.assign({}, alert)
            this.$validator.validateAll().then(result => {
                if(result) {
                    this.$nprogress.start()
                    this.loggingIn = !this.loggingIn
                    const user = {
                        tokens: null,
                        details: null,
                        timeLoggedIn: Date.now()
                    }
                    accountService.postLogin(this, this.email, this.password)
                        .then(response => {
                            user.tokens = response.data
                            this.$store.dispatch('set_user', user)
                            return accountService.getUser(this, response.data.userId)
                        })
                        .then(response => {
                            user.details = response.data
                            this.$store.dispatch('set_user', user)
                            this.$router.push(this.$route.query.redirect || '/dashboard')
                        })
                        .catch(error => {
                            this.$nprogress.done()
                            this.loggingIn = !this.loggingIn
                            this.alert = Object.assign(this.alert, {type: 'error', show: true, message: error.message})
                        })
                }
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

<style scoped lang="scss">
.container:first-of-type {
    // background-color: #F05426;
    background-color: #FAFAFA;

    .toolbar__title {
        font-size: 2rem;
        font-weight: 300;
    }
}
</style>
