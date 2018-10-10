<template>
<vk-grid gutter="large" class="uk-flex uk-flex-center uk-flex-middle uk-flex-column uk-margin-remove-top blueGradient2" style="min-height:90vh;">
<div v-if="!$auth.loggedIn" class="uk-width-1-1">
  <login  />
</div>
<div v-else class="uk-width-1-1 uk-text-center uk-margin-large uk-padding-large" >
<h4 class="white">YOU ARE LOGGED IN WITH  <span class="cyan">{{this.$auth.user.email}}</span>.</h4>
<h5 class="white">ROUTING TO YOUR ACCOUNT.</h5>
<vk-spinner ratio=1.5 class="white"></vk-spinner>
</div>
</vk-grid>
</template>

<script>
import login from '~/components/login'
import moment from 'moment'


export default {

  data() {
    return {

    }
  },
  created() {},
  components: {
    login
  },
  mounted() {
    if(this.$auth.loggedIn) {
      this.$router.push('/account/')
    }
  },
  methods: {
    formatDate(data) {
      var newDate = moment(data)
      return moment(newDate).format('dddd MMMM D, YYYY')
    }


  }
}
</script>

<style>

</style>
