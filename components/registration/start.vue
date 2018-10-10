<template>
<vk-grid gutter="small" class="uk-flex uk-flex-center uk-flex-middle uk-flex-column">
  <div class="uk-width-5-6 uk-width-4-5@m uk-flex uk-flex-center uk-flex-column">
    <div class="registration-card uk-flex uk-flex-center uk-flex-column blueGradient" @click.prevent="goForward()">
      <h2 class="white title">INTRODUCTION</h2>
      <h5 class="white title uk-margin-remove-bottom"><span class="title-bold">INDUSTRY</span> SUMMIT - SERIES No. 1</h5>
      <p class="title cyan uk-margin-remove-top" style="font-size: 11px; letter-spacing: 0.7em; margin-bottom: 20px;">NOVEMBER 28, 2018</p>
      <h5 class="price white title-bold">$49</h5>
      <h5 class="category title-bold">INDIVIDUAL REGISTRATION</h5>
    </div>
  </div>
  <div class="uk-width-1-1 uk-text-center registration-buttons">

    <button class="uk-button uk-button-default continue-btn" @click.prevent="goForward()">START <vk-icon icon="chevron-right" ratio="1"></vk-icon></button>
  </div>
</vk-grid>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.$store.commit('SET_EVENT', {
      id: 1,
      title: 'Introduction',
      date: 'November 28, 2018',
      location: 'Holiday Inn Downtown Binghamton'
    })
    this.$notify.warning({
      title: '** PRICE CHANGE **',
      message: 'Individual registration is $49 until November 11.  After that date, the registration price is $79.',
      overlay: false,
      position: 'bottomRight',
      icon: 'ico-warning',
      timeout: '5000',
      backgroundColor: '#00C7FF',
      // titleColor: '#ffffff',
      // messageColor: '#ffffff',
      iconColor: '#ffffff'
    })
  },
  methods: {
    goForward() {
      this.$store.commit('changeRegistrationPanel', 'forward')
    }
  }
}
</script>

<style scoped>

</style>
