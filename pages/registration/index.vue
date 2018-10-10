<template>
  <div class="uk-width-1-1 blueGradient white" id="sponsors">
    <vk-grid class="uk-flex uk-flex-center  uk-padding" gutter="small">
      <div class="uk-width-1-1 uk-width-3-4@m uk-align-center uk-text-center">
        <h2 class="uk-margin-large-top green">WHY BE A SPONSOR?</h2>
        <p class="uk-text-justify">Your company will be featured as a main supporter
          in growing our economy and you will be linked to
          all economic development leaders in the
          Southern Tier Region.</p>

          <h5 class="title-bold cyan">Sign up for sponsorship by 10/22 to be part of the press conference on October 24!</h5>

      </div>
      <div class="uk-width-1-1 uk-width-1-3@s uk-align-center " style="align-self: flex-start;">
        <div class="blueGradient sponsor-card">
          <h3 class="white uk-text-center">CONFERENCE SPONSOR<br><span class="green">$1,000</span></h3>
          <vk-grid gutter="small">
            <div>
              <h5 class="white">Your LOGO will be <br>featured in:</h5>
              <ul class="">

                <li>video spot</li>
                <li>event website</li>
                <li>event presentation</li>
                <li>press conference on 10/24</li>
                <li>event program</li>
                <li>event leave behind packet</li>
                <li>social media</li>
                <li>sponsors poster</li>
              </ul>
            </div>
            <div>
              <h5 class="white">PLUS YOU WILL GET:</h5>
              <ul>
                <li>8’ x 4’ booth at the event</li>
                <li>20 event registrations (valued at $49 each)</li>
                <li>polo shirts with the partners and sponsors logos</li>
              </ul>
              <div class="uk-width-1-1 uk-text-center">
                <button class="uk-button uk-button-default title-bold" @click="setSponsorship('1000', 'conference', 1)">SIGN UP </button>
              </div>
            </div>
          </vk-grid>
        </div>
      </div>
      <div class="uk-width-1-1 uk-width-1-3@s uk-align-center " style="align-self: flex-start;">
        <div class="sponsor-card">
          <h3 class="white uk-text-center">BOOTH SPONSOR<br><span class="green">$250</span></h3>
          <vk-grid gutter="small">
            <div>
              <ul>
                <li>8’ x 4’ booth at the event</li>
                <li>5 event registrations (valued at $49 each)</li>
              </ul>
            </div>

            <div class="uk-width-1-1 uk-text-center">
              <button class="uk-button uk-button-default title-bold" @click="setSponsorship('250', 'booth', 1)">SIGN UP</button>
            </div>

          </vk-grid>
        </div>
      </div>
      <div class="uk-width-1-1 uk-width-1-3@s uk-align-center" style="align-self: flex-start;">
        <div class="sponsor-card">
          <h3 class="white uk-text-center">NON-PROFIT SPONSOR<br><span class="green">$100</span></h3>
          <vk-grid gutter="small" class="uk-flex uk-flex-center">
            <div>
              <ul>
                <li>8’ x 4’ booth at the event</li>
                <li>2 event registrations (valued at $49 each)</li>
              </ul>
            </div>
            <div>
              <button class="uk-button uk-button-default title-bold" @click="setSponsorship('100', 'non-profit', 1)">SIGN UP</button>
            </div>
          </vk-grid>
        </div>
      </div>
    </vk-grid>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {}
  },
  created() {},
  components: {

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
