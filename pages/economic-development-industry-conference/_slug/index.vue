<template>
<vk-grid gutter="large" class="uk-flex uk-flex-center uk-flex-column">
  <div class="uk-width-1-1">
    <vk-grid class="uk-padding-large uk-flex uk-flex-center uk-flex-column" gutter="large">
      <div class="uk-width-4-5 uk-width-2-3@m uk-align-center">
        <h2 class="green">WHY BE A SPONSOR?</h2>
        <p>Your company will be featured as a main supporter
          in growing our economy and you will be linked to
          all economic development leaders in the
          Southern Tier Region.</p>
      </div>
      <div class="uk-width-4-5 uk-width-2-3@m uk-align-center">
        <h3 class="blue">CONFERENCE SPONSOR: <span class="green">$1,000</span></h3>
        <vk-grid gutter="small">
          <div>
            <h5 class="blue">Your LOGO will be <br>featured in:</h5>
            <ul class="">

              <li>video spot</li>
              <li>event website</li>
              <li>event presentation</li>
              <li>press conference</li>
              <li>event program</li>
              <li>event leave behind packet</li>
              <li>social media</li>
              <li>sponsors poster</li>
            </ul>
          </div>
          <div>
            <h5 class="blue">PLUS YOU WILL GET:</h5>
            <ul>
              <li>8’ x 4’ booth at the event</li>
              <li>20 event registrations (valued at $49 each)</li>
              <li>polo shirts with the partners and sponsors logos</li>
            </ul>
            <nuxt-link to="sponsorship" class="uk-margin-large-left uk-button uk-button-default">SIGN UP <vk-icon icon="chevron-right"></vk-icon></nuxt-link>
          </div>
        </vk-grid>
      </div>
      <div class="uk-width-4-5 uk-width-2-3@m uk-align-center">
        <h3 class="blue">BOOTH SPONSOR: <span class="">$250</span></h3>
        <vk-grid gutter="small">
          <div>
            <ul>
              <li>8’ x 4’ booth at the event</li>
              <li>5 event registrations (valued at $49 each)</li>
            </ul>
          </div>
          <div>
            <nuxt-link to="sponsorship" class="uk-margin-large-left uk-button uk-button-default">SIGN UP <vk-icon icon="chevron-right"></vk-icon></nuxt-link>
          </div>
        </vk-grid>
        <h3 class="blue">NON-PROFIT SPONSOR: <span class="">$100</span></h3>
        <vk-grid gutter="small">
          <div>
            <ul>
              <li>8’ x 4’ booth at the event</li>
              <li>2 event registrations (valued at $49 each)</li>
            </ul>
          </div>
          <div>
            <nuxt-link to="sponsorship" class="uk-margin-large-left uk-button uk-button-default">SIGN UP <vk-icon icon="chevron-right"></vk-icon></nuxt-link>
          </div>
        </vk-grid>
      </div>
    </vk-grid>
  </div>
</vk-grid>
</template>

<script>
import moment from 'moment'
import logo from '~/components/logo.vue'
import industryChart from '~/components/industry-chart.vue'
export default {
  async asyncData({
    app
  }) {
    let [eventReq, sessionsReq, partnersReq, sponsorsReq] = await Promise.all([
      app.$axios.$get('/tables/event/rows/'),
      app.$axios.$get('/tables/sessions/rows/'),
      app.$axios.$get('/tables/partners/rows/'),
      app.$axios.$get('/tables/sponsors/rows/')
    ])
    return {
      event: eventReq.data[0],
      sessions: sessionsReq.data,
      partners: partnersReq.data,
      sponsors: sponsorsReq.data
    }
  },
  data() {
    return {}
  },
  created() {},
  components: {
    logo,
    industryChart
  },
  mounted() {

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
