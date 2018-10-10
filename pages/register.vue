<template>
<vk-grid id="registration" gutter="large" class="uk-flex uk-flex-center uk-flex-column uk-margin-remove-top">
  <div class="uk-text-center">
    <h2 class="blue form-title">INDIVIDUAL REGISTRATION</h2>
  </div>
  <div class="uk-width-1-1 uk-margin-remove-top uk-margin-remove-bottom" v-if="this.$store.state.registrationPanel > 0 && this.$store.state.registrationPanel < 5">
    <timeline  />
  </div>
  <div class="uk-width-1-1 uk-align-center uk-text-center form-message">
    <transition name="fade" mode="out-in">
      <p v-if="message" class="uk-text-uppercase title-bold blue"><span class="title">STEP {{this.$store.state.registrationPanel}}:</span> {{message}}</p>
    </transition>
  </div>

  <transition :enter-active-class="animateIn" :leave-active-class="animateOut" mode="out-in">
    <div class="uk-width-1-1 uk-margin-remove" v-if="this.$store.state.registrationPanel == 1" key="1">
      <start />
    </div>
    <div class="uk-width-1-1 uk-margin-remove" v-if="$store.state.registrationPanel == 2 && this.$auth.loggedIn" key="2">
    <infoLoggedIn  />
    </div>
    <div class="uk-width-1-1 uk-margin-remove" v-if="$store.state.registrationPanel == 2 && !this.$auth.loggedIn" key="2">
    <infoOne  />
  </div>
  <div class="uk-width-1-1 uk-margin-remove" v-if="this.$store.state.registrationPanel == 3" key="3">
    <infoTwo  />
  </div>
    <div class="uk-width-1-1 uk-margin-remove" v-if="this.$store.state.registrationPanel == 4" key="4">
      <checkout />
    </div>
    <div class="uk-width-1-1 uk-margin-remove" v-if="this.$store.state.registrationPanel == 5 && this.$auth.loggedIn" key="5">
      <confirmation />
    </div>
    <div class="uk-width-1-1 uk-margin-remove" v-if="$store.state.registrationPanel == 6" key="6">
      <vk-grid gutter="large" class="uk-flex uk-flex-center">
        <div class="uk-width-5-6 uk-margin-remove uk-text-center">
        <h5 class="title white">Hey <span class="cyan title-bold">{{this.$auth.user.first_name}}</span>, it looks like you have already registered for this Industry Summit.</h5>
        <p class="white title ">Manage your account info and registrations on your <nuxt-link to="/account/" style="text-decoration:underline" class="cyan">account page</nuxt-link>.</p>
      </div>
      </vk-grid>
  </div>
  </transition>
</vk-grid>
</template>
<script>
import timeline from '~/components/registration/timeline'
import start from '~/components/registration/start'
import infoOne from '~/components/registration/infoOne'
import infoTwo from '~/components/registration/infoTwo'
import infoLoggedIn from '~/components/registration/infoLoggedIn'
import checkout from '~/components/registration/checkout-test'
import confirmation from '~/components/registration/confirmation'

export default {
  auth: false,
  data() {
    return {
      animateIn: 'uk-animation-slide-right-small uk-animation-fast',
      animateOut: 'uk-animation-slide-left-small uk-animation-reverse uk-animation-fast',
      registered: false
    }
  },
  components: {
    timeline,
    checkout,
    infoOne,
    infoTwo,
    infoLoggedIn,
    confirmation,
    start
  },
  methods: {
    changePanel(direction) {
      if (direction === 'forward') {
        this.$store.state.registrationPanel++
        this.animateIn = 'uk-animation-slide-right-small uk-animation-fast'
        this.animateOut = 'uk-animation-slide-left-small uk-animation-reverse uk-animation-fast'
      } else if (direction === 'backward') {
        this.$store.state.registrationPanel--
        this.animateIn = 'uk-animation-slide-left-small uk-animation-fast'
        this.animateOut = 'uk-animation-slide-right-small uk-animation-reverse uk-animation-fast'
        if (this.$store.state.registrationPanel === 1) {
          this.$store.state.event = '';
        }
      }
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
        var app = this
        this.$axios.$get('/tables/registrations/rows/?filters[user_id.email][eq]=' + this.$auth.user.email + '&filters[payment_status][eq]=PAID').then(response => {
          if (response.data.length > 0) {
            app.registered = true;
            app.$store.commit('SET_REGISTRATION_PANEL', 6)
          } else {
              app.$store.commit('SET_REGISTRATION_PANEL', 1)
          }
        }).then(res => {
          app.$axios.$get('/tables/payments/rows/?filters[user_id.email][eq]=' + app.$auth.user.email).then(response => {
            if (response.data.length > 0) {
              app.$store.commit('SET_CUSTOMER_ID', response.data[0].stripe_id)
            }
          })
        })

    } else {
      this.$store.commit('SET_REGISTRATION_PANEL', 1)
    }
  },
  computed: {

    message: function () {
      if (this.$store.state.registrationPanel === 1) {
        return 'Start your registration.'
      } else if (this.$store.state.registrationPanel === 2 && this.$auth.loggedIn) {
        return 'Enter your password to continue.'

      } else if (this.$store.state.registrationPanel === 2 && !this.$auth.loggedIn) {
        return 'Register your email and password to continue.'

      } else if (this.$store.state.registrationPanel === 3) {
        return 'Now verify your information.'

      } else if (this.$store.state.registrationPanel === 4) {
        return 'Now complete the payment.'

      } else if (this.$store.state.registrationPanel === 5) {
        return "That's it " + this.$auth.user.first_name + ".  We appreciate your support!"
      } else if (this.$store.state.panel === 6) {}

    }
  }
}
</script>
