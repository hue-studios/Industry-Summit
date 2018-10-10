<template>
<vk-grid id="confirmation" class="uk-flex uk-flex-center uk-flex-middle">
  <div class="uk-width-1-1 uk-text-center">
    <h3 class="confirmation-title white">{{this.$auth.user.first_name}} is officially registered!</h3>
  </div>
  <div class="uk-width-5-6 uk-margin-medium-bottom">
    <vk-grid id="details" class="blueGradient uk-flex uk-flex-center uk-flex-middle">
      <div class="uk-width-1-1 uk-width-auto@s uk-text-center uk-text-left@s uk-padding-remove">
        <img :src="'https://ui-avatars.com/api/?name=' + this.$auth.user.first_name + '+' + this.$auth.user.last_name" />
      </div>
      <div class="uk-width-expand">
        <h5 class="dark-gray">REGISTRATION INFO</h5>
        <h4 class="white title uk-text-uppercase">{{this.$auth.user.first_name}} {{this.$auth.user.last_name}}</h4>
        <p class="white title uk-text-uppercase"><span class="dark-gray">EMAIL: </span> {{this.$auth.user.email}}</p>
        <p v-if="this.$auth.user.position" class="blue2 title uk-text-uppercase"><span class="dark-gray">COMPANY: </span> {{this.$auth.user.position}}</p>
        <p v-if="this.$auth.user.location" class="blue2 title uk-text-uppercase"><span class="dark-gray">INDUSTRY: </span> {{this.$auth.user.location}}</p>
      </div>
    </vk-grid>
  </div>
  <div class="uk-width-1-1 uk-margin-large uk-text-center">
    <p class="white title uk-text-uppercase">Manage your account info and registrations on your <nuxt-link to="/account/" style="text-decoration:underline" class="cyan">account page</nuxt-link>.</p>
  </div>
</vk-grid>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {}
  },
  components: {},
  mounted() {
    var app = this
    axios.post('https://southerntiersummit.com/api/registrationMessage.php?first_name='+ app.$auth.user.first_name + '&last_name=' + app.$auth.user.first_name + '&email=' + app.$auth.user.email + '&company=' + app.$auth.user.position + '&industry=' + app.$auth.user.location + '&event=' + app.$store.state.event.title + '&date=' + app.$store.state.event.date + '&location=' + app.$store.state.event.location).then(res => {
      console.log(res)

    }).catch(error => {})

  },
  methods: {
    goBack() {
      this.$store.commit('changeRegistrationPanel', 'backward')
    },
    goForward() {
      this.$store.commit('changeRegistrationPanel', 'forward')
    }
  }
}
</script>
<style scoped lang="scss">
.stripe-card {
    WIDTH: 300PX;
}
</style>
