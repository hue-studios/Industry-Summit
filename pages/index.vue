<template>
<vk-grid gutter="large" class="uk-flex uk-flex-center uk-flex-column uk-margin-remove-top">
  <div id="intro" class="uk-width-1-1 uk-flex uk-flex-center uk-flex-column uk-margin-remove-top">
    <div id="chart-graphic" uk-parallax="y: 300px; target: #intro;">
      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1278.69 634.95">
        <title>chart-graphic</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1-2">
            <polygon id="bg1" class="cls-1" points="1278.69 634.95 0 615.13 156.65 64.67 428.24 111.77 677.64 0 1073.28 156.22 1278.69 634.95" />
            <g class="cls-2">
              <polygon id="bg2" class="cls-3" points="1278.69 634.95 0 615.13 59.28 138.98 429.71 184.54 683.17 273.47 1071.53 69.66 1278.69 634.95" />
            </g>
            <g class="cls-2">
              <polygon id="bg3" class="cls-4" points="1278.69 634.95 0 615.13 61.44 199 429.26 366 680.75 153.97 1074.65 224.4 1278.69 634.95" />
            </g>
          </g>
        </g>
      </svg>
    </div>
    <vk-grid class="uk-flex uk-flex-middle uk-flex-center">
      <div id="title" class="uk-width-1-1 uk-width-auto@s " uk-parallax="y: -10px; target: #intro;">
        <h4 uk-parallax="y: 90px; target: #intro;" class="title white uk-margin-remove-bottom">
          <logo /> <span id="series"> - SERIES <span class="">N<span class="uk-text-lowercase">o</span>. {{event.series_number}}</span></span></h4>
        <h1 uk-parallax="y: 80px; target: #intro;" class="uk-margin-remove-top white title">{{event.title}}</h1>

      </div>
      <div id="caption" class="uk-width-4-5 uk-width-auto@s" uk-parallax="y: 100px; target: #intro;">
        <h4 uk-parallax="y: 30px; target: #intro;" class="white uk-margin-small-bottom title-bold">
          <vk-icon icon="calendar"></vk-icon> {{formatDate(event.date)}}
        </h4>
        <h4 uk-parallax="y: 30px; target: #intro;" class="white uk-margin-small-bottom title-bold">
          <vk-icon icon="clock"></vk-icon> {{formatTime(event.start_time)}} - {{formatTime(event.end_time)}} <span class="cyan" id="sub-caption">[REFRESHMENTS AND LUNCH PROVIDED]</span>
        </h4>
        <h4 uk-parallax="y: 20px; target: #intro;" class="white title-bold">
          <vk-icon-link :href="'https://google.com/maps/place/'+ event.location_address+'/'" target="_blank" icon="location"></vk-icon-link> {{event.location}}
        </h4>

        <div class="caption-text">
          <p v-text="event.caption" class="white"></p>
        </div>
        <nuxt-link to="/registration/register/" class="uk-button uk-button-default title-bold">REGISTER NOW</nuxt-link>
      </div>
    </vk-grid>
  </div>


  <div id="learn-points" class="uk-width-1-1  uk-margin-remove-top blueGradient uk-padding-large">

    <vk-grid gutter="small" class="uk-flex uk-flex-center uk-flex-middle uk-flex-column uk-position-relative">
      <h2 class="uk-position-absolute white">INDUSTRY SUMMIT</h2>
      <div class="uk-width-4-5">
        <h1 class="uk-text-uppercase uk-text-center green">WHAT YOU WILL LEARN:</h1>
        <div v-html="event.what_you_will_learn" class="white"></div>
      </div>
    </vk-grid>
  </div>
  <div class="uk-width-1-1 uk-margin-remove-top">
    <vk-grid id="partners" class="uk-padding-large uk-padding-remove-bottom" gutter="large">
      <h2 uk-parallax="x: 30px; target: #partners;" class="uk-width-1-1 uk-text-uppercase title-bold blue uk-position-relative"><span class="box"></span>in siders</h2>
      <div class="uk-width-1-1">
        <vk-grid class="uk-flex uk-flex-center uk-flex-top">
          <div class="uk-width-1-1 uk-width-auto@m uk-text-center uk-text-left@m" style="align-self:flex-start;">
            <h5 class="uk-text-center uk-text-left@m">HOST</h5>
            <img v-if="event.host_logo" :src="'https://southerntiersummit.com/manage/thumbnail/100/100/contain/'+event.host_logo.data.name" />
          </div>
          <div class="uk-width-1-1 uk-width-expand@m">
            <vk-grid class="uk-flex uk-flex-middle uk-flex-center" gutter="small">
              <div class="uk-width-1-1">
                <h5 class="uk-text-center">conference partners</h5>
              </div>
              <div v-for="partner in partners" :key="partner.id"><img :src="'https://southerntiersummit.com/manage/thumbnail/100/100/contain/'+partner.logo.data.name" v-if="partner.logo" :alt="partner.title"></div>
              <!-- <div class="uk-width-1-1">
                <h5 class="uk-text-center">supported by</h5>
              </div>
              <div v-for="partner in supporters" :key="partner.id"><img v-if="partner.logo" :src="'https://southerntiersummit.com/manage/thumbnail/100/100/contain/'+partner.logo.data.name" :alt="partner.title"></div> -->
            </vk-grid>
          </div>
        </vk-grid>
      </div>
    </vk-grid>
  </div>
  <div class="uk-width-1-1">
    <vk-grid id="about" gutter="large" class="uk-padding-large uk-flex uk-flex-center uk-flex-middle">

      <h1 class="uk-text-uppercase uk-text-center green uk-width-1-1">WHAT WILL IT INVOLVE?</h1>
      <div class="uk-width-1-1 uk-width-1-2@s uk-width-2-5@m">
        <p class="title-bold">The industry summit will be a series of workshop format sessions that will take place several times a year. This series will serve as a platform for increased collaborative effort that removes boundaries and encourages conversation for
          business & community building. It will include the following objectives:</p>
      </div>
      <div class="uk-width-1-1 uk-width-1-2@s uk-width-2-5@m">
        <ul>
          <li class="title-bold blue"><span class="cyan title-bold uk-text-uppercase">Analyze</span> the current industry state of The Southern Tier</li>

          <li class="title-bold blue"><span class="cyan title-bold uk-text-uppercase">Learn</span> industry trends from insiders</li>

          <li class="title-bold blue"><span class="cyan title-bold uk-text-uppercase">Share</span> best practices to better your business within your industry.</li>

          <li class="title-bold blue"><span class="cyan title-bold uk-text-uppercase">STRENGTHEN</span> our economy in The Southern Tier</li>
        </ul>
      </div>

      <p class="uk-text-center blue uk-width-1-1 title-bold">You will be grouped with like-minded individuals within your industry.</p>
    </vk-grid>
  </div>
  <div id="industry-chart-box" class="uk-width-1-1 uk-flex uk-flex-center uk-flex-column">

    <industry-chart uk-parallax="rotate: 5deg, 0deg;viewport: 0.3; easing: 0.6" />
    <p class="uk-text-center blue uk-width-1-1 uk-padding-large title-bold">We will be focusing
      on the above industries
      for future series. </p>
  </div>
  <div class="uk-width-1-1 uk-flex uk-flex-center blueGradient">
    <vk-scrollspy :cls="['uk-animation-fade']" target="> div" :delay="100" repeat>
      <vk-grid id="agenda" class="uk-padding-large uk-flex uk-flex-center uk-flex-top" v-vk-height-match="'.uk-card'">

        <div class="uk-width-1-1">
          <h2 class="green section-title">EVENT SESSIONS</h2>
        </div>
        <div class="uk-width-1-1 uk-width-1-2@s uk-width-1-3@m session-card" v-for="session in sessions" :key="session.id" v-bind:class="{ callout: session.callout }">
          <vk-card>
            <h1>{{session.title}}</h1>
            <div v-html="session.description"></div>
          </vk-card>
        </div>

      </vk-grid>


    </vk-scrollspy>
  </div>
  <div class="uk-width-1-1">
    <vk-grid id="sponsor" class="uk-padding-large uk-padding-remove-top" gutter="large">
      <h2 uk-parallax="x: 30px; opacity: 0.2,1; target: #sponsor;" class="uk-width-1-1 uk-text-uppercase title uk-position-relative"><span class="box"></span>in sponsors</h2>
      <div class="uk-width-1-1">
        <vk-grid class="uk-flex uk-flex-center uk-flex-middle">
          <div v-for="sponsor in sponsors" :key="sponsor.id" :id="sponsor.id" ><img v-if="sponsor.logo" :src="'https://southerntiersummit.com/manage/thumbnail/100/100/contain/'+sponsor.logo.data.name" :alt="sponsor.company"></div>
          <div class="uk-width-1-1">
            <h5 class="uk-text-center">Media Sponsors</h5>
          </div>
          <div v-for="mediaSponsor in mediaSponsors" :key="mediaSponsor.id" :id="mediaSponsor.id" ><img v-if="mediaSponsor.logo" :src="'https://southerntiersummit.com/manage/thumbnail/100/100/contain/'+mediaSponsor.logo.data.name" :alt="mediaSponsor.company"></div>
          <div class="uk-width-1-1">
            <h5 class="uk-text-center">Booth Sponors</h5>
          </div>
          <div v-for="(boothSponsor, index) in boothSponsors" :key="boothSponsor.id * index" :id="boothSponsor.id" ><img v-if="boothSponsor.logo" :src="'https://southerntiersummit.com/manage/thumbnail/100/100/contain/'+boothSponsor.logo.data.name" :alt="boothSponsor.company"></div>
        </vk-grid>
      </div>
    </vk-grid>
  </div>

  <div class="uk-width-1-1 blueGradient white" id="sponsors">
    <vk-grid class="uk-flex uk-flex-center uk-flex-column uk-padding" gutter="small">
      <div class="uk-width-1-1 uk-width-3-4@m uk-align-center uk-text-center">
        <h2 class="uk-margin-large-top green">WHY BE A SPONSOR?</h2>
        <p class="uk-text-justify">Your company will be featured as a main supporter
          in growing our economy and you will be linked to
          all economic development leaders in the
          Southern Tier Region.</p>

        <h5 class="title-bold cyan">Sign up for sponsorship by 10/22 to be part of the press conference on October 24!</h5>

      </div>
      <div class="uk-width-1-1 uk-width-3-4@m uk-width-2-3@l uk-width-1-2@xl">
        <div class="blueGradient sponsor-card">
          <h3 class="white uk-text-center">CONFERENCE SPONSOR<br><span class="green">$1,000</span></h3>
          <vk-grid gutter="large" class="uk-flex uk-flex-center">
            <div class="uk-width-1-1 uk-width-1-2@s uk-width-2-5@m">
              <h5 class="white uk-margin-remove-top">Your LOGO will be featured in:</h5>
              <ul class="">

                <li>video spot</li>
                <li>event website</li>
                <li>event presentation</li>
                <li>press conference on 10/24</li>
                <li>event program</li>
                <li>event leave behind packet</li>
              </ul>
            </div>
            <div class="uk-width-1-1 uk-width-1-2@s uk-width-2-5@m uk-margin-remove-top">
              <ul class="uk-margin-small-top">

                <li>social media</li>
                <li>sponsors poster</li>
              </ul>
              <h5 class="white uk-margin-remove-top">PLUS YOU WILL GET:</h5>
              <ul>
                <li>8’ x 4’ booth at the event</li>
                <li>20 event registrations (valued at $49 each)</li>
                <li>polo shirts with the partners and sponsors logos</li>
              </ul>

            </div>
            <div class="uk-width-1-1 uk-text-center uk-margin-small-top">
              <button class="uk-button uk-button-default title-bold" @click="setSponsorship('1000', 'conference', 1, 20)">SIGN UP </button>
            </div>

          </vk-grid>
        </div>
      </div>
      <div class="uk-width-1-1 uk-width-3-4@m uk-width-2-3@l uk-width-1-2@xl">
        <vk-grid gutter="small">
          <div class="uk-width-1-1 uk-width-1-2@s">
            <div class="sponsor-card">
              <h3 class="white uk-text-center">BOOTH SPONSOR<br><span class="green">$250</span></h3>
              <vk-grid gutter="small" class="uk-flex uk-flex-center">
                <div>
                  <h5 class="white uk-margin-remove-top">Your Sponsorship Includes:</h5>
                  <ul>
                    <li>8’ x 4’ booth at the event</li>
                    <li>5 event registrations (valued at $49 each)</li>
                  </ul>
                  <h5 class="white uk-margin-remove-top">Your LOGO will be featured in:</h5>
                  <ul class="">
                    <li>event website</li>

                    <li>social media</li>
                  </ul>
                </div>

                <div class="uk-width-1-1 uk-text-center">
                  <button class="uk-button uk-button-default title-bold" @click="setSponsorship('250', 'booth', 1, 5)">SIGN UP</button>
                </div>

              </vk-grid>
            </div>
          </div>
          <div class="uk-width-1-1 uk-width-1-2@s">
            <div class="sponsor-card">
              <h3 class="white uk-text-center">NON-PROFIT SPONSOR<br><span class="green">$100</span></h3>
              <vk-grid gutter="small" class="uk-flex uk-flex-center">
                <div>
                  <h5 class="white uk-margin-remove-top">Your Sponsorship Includes:</h5>
                  <ul>
                    <li>8’ x 4’ booth at the event</li>
                    <li>2 event registrations (valued at $49 each)</li>
                  </ul>
                  <h5 class="white uk-margin-remove-top">Your LOGO will be featured in:</h5>
                  <ul class="">
                    <li>event website</li>

                    <li>social media</li>
                  </ul>
                </div>
                <div class="uk-width-1-1 uk-text-center">
                  <button class="uk-button uk-button-default title-bold" @click="setSponsorship('100', 'non-profit', 1, 2)">SIGN UP</button>
                </div>
              </vk-grid>
            </div>
          </div>
        </vk-grid>
      </div>
    </vk-grid>
  </div>
  <div id="about" class="uk-width-1-1 uk-flex uk-flex-center uk-position-relative">
    <h2 class=" uk-text-uppercase uk-text-center uk-position-absolute">ABOUT</h2>
    <vk-grid gutter="large" class="uk-flex uk-flex-center uk-flex-column uk-padding">
      <div class="uk-width-5-6 uk-width-2-3@m blue uk-text-left">
        <p class="uk-margin-large-top bold">The concept for the Industry Summit series is an out-growth of work performed during the ST8 2018 CEDS. Hundreds of Southern Tier stakeholders from private and public sectors contributed ideas to strengthen and promote theSouthern Tier.  The Industry Summit emerged as a much sought after and supported concept. All sectors of the regional community supported the development of an innovative approach to leverage regional assets, pool resources, and represent the region as nationally and globally competitive in the global economy.</p>
      </div>
      <div class="uk-width-1-1 uk-text-center uk-margin-small-top">
        <nuxt-link to="registration/register" class="uk-button uk-button-default title-bold">REGISTER NOW</nuxt-link>
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
  auth: false,
  async asyncData({
    app
  }) {
    let [eventReq, sessionsReq, sponsorsReq, mediaSponsorsReq, partnersReq] = await Promise.all([
      app.$axios.$get('/tables/event/rows/'),
      app.$axios.$get('/tables/sessions/rows/'),
      app.$axios.$get('/tables/sponsors/rows/?filters[category]=Sponsor'),
      app.$axios.$get('/tables/sponsors/rows/?filters[category]=Media'),
      app.$axios.$get('/tables/partners/rows/')
    ])
    return {
      event: eventReq.data[0],
      sessions: sessionsReq.data,
      sponsors: sponsorsReq.data,
      mediaSponsors: mediaSponsorsReq.data,
      partners: partnersReq.data
    }
  },
  data() {
    return {
      boothSponsors: []
    }
  },
  created() {
    this.$axios.$get('/tables/sponsors/rows/?filters[category]=Booth').then(res => {
      this.boothSponsors = res.data
    })
    // this.$axios.$get('/tables/partners/rows/').then(res => {
    //   this.partners = res.data
    // })

  },
  components: {
    logo,
    industryChart
  },
  mounted() {
    // if(this.$auth.$state.strategy == 'google') {
    //   this.$router.push('/account/update')
    // }
  },
  methods: {
    formatTime(data) {
      let date = data; //12 January 2016
      let parsedDate = moment(date, 'h:mm:ss')
      return moment(parsedDate.toISOString()).format('h:m A')
    },
    formatDate(data) {
      var newDate = moment(data)
      return moment(newDate).format('dddd MMMM D, YYYY')
    },
    setSponsorship(cost, name, id, registrations) {
      console.log(cost + name)
      this.$store.commit('SET_SPONSORSHIP', {
        price: cost,
        title: name,
        event: id,
        registrations: registrations
      })
      this.$router.push('/registration/sponsor')
    }


  }
}
</script>

<style>

</style>
