<template>
<vk-grid id="confirmation" class="uk-flex uk-flex-center uk-flex-middle">
  <div class="uk-width-1-1 uk-text-center">
    <h3 class="confirmation-title white">{{this.$store.state.temp_user.position}} is an official sponsor!</h3>
  </div>
  <div>
    <vk-grid id="details" class="uk-flex uk-flex-center uk-flex-middle blueGradient">
      <div class="uk-width-auto">
        <img :src="'https://southerntiersummit.com/manage/thumbnail/100/100/contain/' + this.$store.state.sponsorship.image" />
</div>
        <div class="uk-width-expand">
          <h3 class="white condensed uk-text-uppercase">{{this.$store.state.temp_user.position}}</h3>
          <h4 class="white">{{this.$store.state.sponsorship.title}} SPONSOR</h4>
          <h5 class="dark-gray">CONTACT INFO</h5>
          <p class="white condensed uk-text-uppercase">{{this.$store.state.temp_user.first_name}} {{this.$store.state.temp_user.last_name}}</p>
          <p class="white condensed uk-text-uppercase">{{this.$store.state.temp_user.email}}</p>
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
    this.updateSponsorLogo()
  },
  methods: {
    goBack() {
      this.$store.commit('changePanel', 'backward')
    },
    goForward() {
      this.$store.commit('changePanel', 'forward')
    },
    updateSponsorLogo() {
      var app = this
      this.$axios({
        method: 'put',
        url: '/tables/sponsors/rows/' + this.$store.state.sponsorship.id,
        data: {
          logo: app.$store.state.sponsorship.logo,
        }
      }).then(response2 => {
        console.log("sponsor updated:: " + response2.data)

        axios.post('https://southerntiersummit.com/api/sponsorMessage.php?first_name='+ app.$auth.user.first_name + '&last_name=' + app.$auth.user.first_name + '&email=' + app.$auth.user.email + '&sponsorship=' + app.$store.state.sponsorship.title + '&company=' + app.$store.state.temp_user.position + '&event=' + app.$store.state.sponsorship.title + '&date=' + app.$store.state.sponsorship.date + '&guests=' + app.$store.state.sponsorship.registrations).then(res => {
          console.log(res)

        }).catch(error => {})
      }).catch(error => {})


    }
  }
}
</script>
<style scoped lang="scss">
.stripe-card {
    WIDTH: 300PX;
}
</style>
