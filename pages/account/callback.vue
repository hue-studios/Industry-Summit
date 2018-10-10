<template>
<vk-grid gutter="large" class="uk-flex uk-flex-center uk-flex-column uk-margin-remove-top blueGradient" style="min-height:90vh;">
  <div class="uk-width-1-1 uk-flex uk-flex-center uk-flex-column uk-margin-remove-top">
    <h1 class="white">LOGGING IN</h1>
  </div>

</vk-grid>
</template>

<script>
import moment from 'moment'

export default {
  auth: false,
  data() {
    return {}
  },
  created() {
    console.log(this.$auth.$state.strategy)
  },
  components: {
  },
  mounted() {
    // if(this.$auth.$state.strategy == 'google') {
    //   console.log('google it was')
    //   this.$router.push('/account/update')
    // } else {
    //   this.$router.push('/account/update')
    // }
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
