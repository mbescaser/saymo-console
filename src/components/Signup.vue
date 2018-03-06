<template>
    <div id="signup-wrapper">
        <div class="md-layout md-alignment-center-center">
            <div class="md-layout-item md-xsmall-size-75 md-small-size-50 md-medium-size-33 md-size-25">
                <md-card>
                    <md-card-content>
                        <form v-if="!signingUp && !doneRegister" @submit.prevent="formSubmit()" method="post" novalidate="true">
                            <md-field :class="{'md-invalid': errors.has('email')}">
                                <label class="required-field">E-mail</label>
                                <md-input
                                    v-model="email"
                                    v-validate="{required: true, email: true}"
                                    name="email"
                                    type="email">
                                </md-input>
                                <span class="md-error">{{ errors.first('email') }}</span>
                            </md-field>
                            <md-field :class="{'md-invalid': errors.has('password')}">
                                <label class="required-field">Password</label>
                                <md-input
                                    v-model="password"
                                    v-validate="{required: true, min: 6, max: 32}"
                                    name="password"
                                    type="password">
                                </md-input>
                                <span class="md-error">{{ errors.first('password') }}</span>
                            </md-field>
                            <md-field :class="{'md-invalid': errors.has('confirmPassword')}" :md-toggle-password="false">
                                <label class="required-field">Confirm Password</label>
                                <md-input
                                    v-model="confirmPassword"
                                    v-validate="{required: true, confirmed: password}"
                                    data-vv-as="confirm password"
                                    name="confirmPassword"
                                    type="password">
                                </md-input>
                                <span class="md-error">{{ errors.first('confirmPassword') }}</span>
                            </md-field>
                            <md-button type="submit" class="md-raised md-accent">Signup</md-button>
                        </form>
                        <div v-if="signingUp" class="md-layout md-alignment-center-center">
                            <div class="md-layout-item md-size-10">
                                <md-progress-spinner
                                    class="md-accent"
                                    md-mode="indeterminate"
                                    :md-diameter="30"
                                    :md-stroke="3">
                                </md-progress-spinner>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
import { Validator } from 'vee-validate'

export default {
    inject: ['$validator'],
    $_veeValidate: {
        validator: 'new'
    },
    data() {
        return {
            title: 'Signup',
            email: null,
            password: null,
            confirmPassword: null,
            signingUp: false,
            doneRegister: false
        }
    },
    methods: {
        formSubmit() {
            this.signingUp = !this.signingUp
            this.$validator.validateAll().then(result => {
                if(result) {

                } else {
                    this.signingUp = !this.signingUp
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

<style>
#signup-wrapper {
    background-color: #F05426;
    height: 100vh;
}
#signup-wrapper > .md-layout {
    height: 100vh;
}
#signup-wrapper form button[type="submit"] {
    width: 100%;
    margin: 10px 0 5px;
}
#signup-wrapper form .text-message {
    font-size: 12px;
    text-align: center;
}
#signup-wrapper .md-progress-spinner {
    margin-top: 15px;
}
</style>
