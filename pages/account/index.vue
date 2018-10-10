<template>
<div id="account" class="uk-width-1-1 uk-margin-remove-top">
  <vk-grid gutter="large" class="uk-padding-large uk-flex uk-flex-center uk-flex-column">
    <div class="uk-width-1-1 uk-margin-small-top uk-margin-medium-top@m">
      <h1 class="white uk-text-center">ACCOUNT: {{$auth.user.email}}</h1>
    </div>

    <div class="uk-width-1-1">
      <vk-tabs animation="fade" class="white" align="center">
        <vk-tabs-item title="INFO">
          <div class="uk-width-1-1 uk-flex uk-flex-center uk-margin-large-top">
            <form id="registerForm" class="uk-padding-large blueGradient uk-margin-remove-top uk-margin-large-top@s" autocomplete="off" @click.prevent>
              <vk-grid class="">
                <div class="uk-width-1-2@m uk-margin-small-top">
                  <label class="uk-form-label">FIRST NAME<vk-icon icon="triangle-down"></vk-icon></label>
                  <div class="uk-form-controls">
                    <input class="uk-input" type="text" v-model="first_name" name="first_name" v-validate="'required'">
                    <transition name="fade" mode="out-in">
                      <vk-icon v-show="errors.has('first_name')" icon="warning"></vk-icon>
                    </transition>
                    <transition name="fade" mode="out-in">
                      <span v-show="errors.has('first_name')" class="error">First name required.</span>
                    </transition>
                  </div>
                </div>
                <div class="uk-width-1-2@m uk-margin-small-top">
                  <label class="uk-form-label">LAST NAME<vk-icon icon="triangle-down"></vk-icon></label>
                  <div class="uk-form-controls">
                    <input class="uk-input" type="text" v-model="last_name" name="last_name" v-validate="'required'">
                    <transition name="fade" mode="out-in">
                      <vk-icon v-show="errors.has('last_name')" icon="warning"></vk-icon>
                    </transition>
                    <transition name="fade" mode="out-in">
                      <span v-show="errors.has('last_name')" class="error">Last name required.</span>
                    </transition>
                  </div>
                </div>


                <div class="uk-width-1-2@m uk-margin-small-top">
                  <label class="uk-form-label">COMPANY<vk-icon icon="triangle-down"></vk-icon></label>
                  <div class="uk-form-controls">
                    <input class="uk-input" type="text" v-model="position" name="position" v-validate="'required'">
                    <transition name="fade" mode="out-in">
                      <vk-icon v-show="errors.has('position')" icon="warning"></vk-icon>
                    </transition>
                    <transition name="fade" mode="out-in">
                      <span v-show="errors.has('position')" class="error">Company is required.</span>
                    </transition>
                  </div>
                </div>
                <div class="zip uk-margin-bottom uk-margin-small-top">
                  <label class="uk-form-label uk-width-auto">ZIP<vk-icon icon="triangle-down"></vk-icon></label>
                  <div class="uk-form-controls">
                    <input class="uk-input" v-model="zip" name="zip" maxlength="5" type="number" v-validate="'required'">
                    <transition name="fade" mode="out-in">
                      <vk-icon v-show="errors.has('zip')" icon="warning"></vk-icon>
                    </transition>
                    <transition name="fade" mode="out-in">
                      <span v-show="errors.has('zip')" class="error">Required</span>
                    </transition>
                  </div>
                </div>
                <div class="uk-width-1-1 uk-margin-bottom uk-margin-small-top uk-width-auto@s uk-margin-top">
                  <label class="uk-form-label">INDUSTRY<vk-icon icon="triangle-down"></vk-icon></label>
                  <div class="uk-form-controls">
                    <select class="uk-select" v-model="location" name="location" size="1" v-validate="'required'">

                      <option v-if="this.$auth.user.location" :value="this.$auth.user.location" selected>{{$auth.user.location}}</option>
                      <option v-else>SELECT INDUSTRY</option>
                      <option v-if="this.$auth.user.location !== 'Advanced Manufacturing'" value="Advanced Manufacturing">Advanced Manufacturing</option>
                      <option v-if="this.$auth.user.location !== 'Agriculture &amp; Beer &amp; Wine'" value="Agriculture &amp; Beer &amp; Wine">Agriculture &amp; Beer &amp; Wine</option>
                      <option v-if="this.$auth.user.location !== 'Healthcare &amp; Life Sciences'" value="Healthcare &amp; Life Sciences">Healthcare &amp; Life Sciences</option>
                      <option v-if="this.$auth.user.location !== 'Education'" value="Education">Education</option>
                      <option v-if="this.$auth.user.location !== 'Energy &amp; Smart Energy'" value="Energy &amp; Smart Energy">Energy &amp; Smart Energy</option>
                      <option v-if="this.$auth.user.location !== 'Culture, Sports, Entertainment, Tourism'" value="Culture, Sports, Entertainment, Tourism">Culture, Sports, Entertainment, Tourism</option>
                      <option v-if="this.$auth.user.location !== 'Advanced Materials'" value="Advanced Materials">Advanced Materials</option>
                      <option v-if="this.$auth.user.location !== 'Financial Services'" value="Financial Services">Financial Services</option>
                      <option v-if="this.$auth.user.location !== 'Business &amp; Professional Services'" value="Business &amp; Professional Services">Business &amp; Professional Services</option>
                      <option v-if="this.$auth.user.location !== 'Media, It, AI, &amp; Communications'" value="Media, It, AI, &amp; Communications">Media, It, AI, &amp; Communications</option>
                    </select>
                    <transition name="fade" mode="out-in">
                      <span v-show="errors.has('location')" class="error">INDUSTRY IS REQUIRED.</span>
                    </transition>
                  </div>
                </div>

              </vk-grid>
            </form>
          </div>
          <div class="uk-width-1-1 uk-text-center registration-buttons">


            <button @click.prevent="sendEmail()" class="uk-button uk-button-default">RESET PASSWORD</button>

            <button class="uk-button uk-button-default" @click.prevent="update()">UPDATE</button>
          </div>
        </vk-tabs-item>
        <vk-tabs-item title="REGISTRATIONS">
          <vk-grid gutter="medium" class=" uk-margin-large-top" v-if="registrations.length > 0">
            <div class="uk-width-1-1 uk-flex uk-flex-center uk-flex-middle">
            <div class="registration-card uk-flex uk-flex-center uk-flex-middle uk-flex-column blueGradient uk-margin-small-top uk-margin-large-top@s" v-for="registration in registrations" :key="registration.id">
              <h2 class="white title">{{registration.event_id.data.title}}</h2>
              <h5 class="white title uk-margin-remove-bottom"><span class="title-bold">INDUSTRY</span> SUMMIT - SERIES No. {{registration.event_id.data.series_number}}</h5>
              <p class="title cyan uk-margin-remove-top uk-text-uppercase" style="font-size: 11px; letter-spacing: 0.7em; margin-bottom: 20px;">{{formatDate(registration.event_id.data.date)}}</p>
              <h5 class="price white title-bold"><svg id="ticket" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109.83 109.83">
                  <title>Ticket</title>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1-2">
                      <path d="M107.41,36.43,99.2,28.29a12.58,12.58,0,0,1-17.73,0,12.08,12.08,0,0,1-3.65-8.87,12,12,0,0,1,3.65-8.86L73.33,2.41a8.43,8.43,0,0,0-11.8,0L2.41,61.46a8.43,8.43,0,0,0,0,11.8l8.15,8.21a12.08,12.08,0,0,1,8.87-3.64,12.09,12.09,0,0,1,8.86,3.64,12.58,12.58,0,0,1,0,17.73l8.21,8.21a8.4,8.4,0,0,0,11.8,0l59.11-59.18A8.4,8.4,0,0,0,107.41,36.43Zm-17.66,13L49.47,89.75a4.25,4.25,0,0,1-5.87,0L20,66.16a4.09,4.09,0,0,1-.09-5.78l.09-.09L60.29,20a4.27,4.27,0,0,1,5.87,0L89.75,43.6a4.08,4.08,0,0,1,.09,5.77l-.09.09Z"
                        transform="translate(0 0)" />
                      <path d="M63.23,25.94l20.59,20.6L46.54,83.82l-20.6-20.6Z" transform="translate(0 0)" />
                      <path class="cls-1" d="M54.56,68.17,41.48,55.08l1-1L55.55,67.17Z" transform="translate(0 0)" />
                      <path class="cls-1" d="M68.14,54.59,49.21,50.76,60.59,62.14l-1,1L46.51,50.05l1-1L66.4,52.84,55.06,41.5l1-1L69.13,53.59Z" transform="translate(0 0)" />
                    </g>
                  </g>
                </svg></h5>
              <h5 class="category title-bold">INDIVIDUAL REGISTRATION</h5>
            </div>
            </div>

          </vk-grid>
          <div class="uk-width-1-1 uk-margin-large-top uk-padding-large" v-else>
            <h5 class="white uk-text-center ">You are not registered for any events.</h5>
          </div>
        </vk-tabs-item>
        <vk-tabs-item title="SPONSORSHIPS">



          <div class="uk-width-1-1 uk-width-auto@m uk-flex uk-flex-center uk-flex-middle tab-content uk-margin-large-top" v-if="sponsors.length > 0">
            <vk-grid gutter="medium" class="blueGradient uk-flex uk-flex-center  sponsorship " v-for="sponsor in sponsors" :key="sponsor.id">
              <div class="uk-width-1-1 uk-margin-medium-top uk-margin-medium-bottom sponsorship-info">
                <vk-grid gutter="medium" >
                  <h3 class="cyan uk-width-1-1">SPONSOR INFO</h3>
                  <div class="uk-width-1-1">
                    <vk-grid>
                      <div class="uk-width-1-1 uk-width-1-2@m">
                  <h5 class="white uk-margin-small uk-margin-remove"><span class="cyan">COMPANY </span> <span class="title-bold">{{sponsor.company}}</span></h5>
                  <h5 class="white uk-margin-small uk-margin-remove"><span class="cyan">LEVEL </span>{{sponsor.sponsorship_level.data.title}} SPONSORSHIP <span class="green">${{sponsor.sponsorship_level.data.price}}.00</span></h5>
                  <h5 class="white uk-margin-small uk-margin-remove"><span class="cyan">EVENT </span> INDUSTRY SUMMIT: <span class="title-bold">{{sponsor.event_id.data.title}}</span></h5>
                  <h5 class="white uk-margin-small uk-margin-remove"><span class="cyan">DATE </span> {{formatDate(sponsor.event_id.data.date)}}</h5>
                </div>
                <div class="uk-width-1-1 uk-width-1-2@m">
                  <h5 class="uk-margin-small uk-margin-remove-bottom cyan">LOGO</h5>
                  <img v-if="sponsor.logo" :src="'https://southerntiersummit.com/manage/thumbnail/100/100/contain/'+sponsor.logo.data.name" :alt="sponsor.company">
                </div>
              </vk-grid>
            </div>
                </vk-grid>
              </div>
              <div class="uk-width-1-1 uk-margin-remove-top uk-margin-medium-bottom sponsorship-extras">

                <vk-grid gutter="medium" >
                  <h3 class="cyan uk-width-1-1">EXTRAS</h3>
                  <div class="uk-margin-remove-top uk-width-1-1 uk-width-1-2@s">
                    <h5 class="cyan uk-margin-small-bottom uk-margin-small-top">SPONSORSHIP INCLUDES:</h5>
                    <div class="white uk-margin-remove" v-html="sponsor.sponsorship_level.data.includes"></div>
                  </div>

                  <div class="uk-margin-remove-top uk-width-1-1 uk-width-1-2@s">
                    <h5 class="cyan uk-margin-small-bottom uk-margin-small-top">YOUR LOGO WILL BE PROMOTED:</h5>
                    <div class="white uk-margin-remove" v-html="sponsor.sponsorship_level.data.promotions"></div>
                  </div>
                </vk-grid>



              </div>
              <div class="uk-width-1-1 uk-margin-remove-top uk-margin-medium-bottom sponsorship-registrations">
                <vk-grid gutter="medium" >
                  <h3 class="cyan uk-width-1-1">REGISTRATIONS</h3>
                  <div v-if="sponsor.sponsorship_level">
                    <h5 class="white uk-text-center">COMING SOON</h5>
                    <!-- <div v-for="(register, index) in sponsor.sponsorship_level.data.registrations" :key="index">

                    </div> -->
                  </div>
                </vk-grid>
              </div>


            </vk-grid>
          </div>
          <div class="uk-width-1-1 uk-margin-large-top uk-padding-large" v-else>
            <h5 class="white uk-text-center ">You are not registered for any sponsorships.</h5>
          </div>
        </vk-tabs-item>
      </vk-tabs>
    </div>




  </vk-grid>
</div>
</template>

<script>
import moment from 'moment'

export default {
  middleware: 'auth',

  data() {
    return {
      first_name: this.$auth.user.first_name,
      last_name: this.$auth.user.last_name,
      position: this.$auth.user.position,
      location: this.$auth.user.location,
      zip: this.$auth.user.zip,
      sponsors: [],
      registrations: []
    }
  },
  created() {
    var app = this
    this.$axios.$get('/tables/sponsors/rows/?filters[user_id.email][eq]=' + app.$auth.user.email).then(function (response) {
      console.log("sponsor " + response)
      app.sponsors = response.data;
    })
    this.$axios.$get('/tables/registrations/rows/?filters[user_id.email][eq]=' + app.$auth.user.email).then(function (res) {
      console.log(res.data)
      app.registrations = res.data
    })
  },
  components: {

  },
  mounted() {

  },
  methods: {
    formatDate(data) {
      var newDate = moment(data)
      return moment(newDate).format('MMMM D, YYYY')
    },
    update() {
      var app = this
      this.$axios({
        method: "PATCH",
        url: '/users/'+ this.$auth.user.id,
        data: {
          first_name: this.first_name,
          last_name: this.last_name,
          position: this.position,
          location: this.location,
          zip: this.zip
        }
      }).then(function (response) {
        console.log(response)
        app.$notify.success({
          title: 'Updated successfully',
          // message: 'Individual registration is $49 until November 11.  After that date, the registration price is $79.',
          overlay: false,
          position: 'bottomRight',
          // icon: 'checkmark',
          timeout: '5000',
          backgroundColor: '#00C7FF',
          // titleColor: '#ffffff',
          // messageColor: '#ffffff',
          iconColor: '#ffffff'
        })

      })
    },
    sendEmail() {
      var app = this
      this.$store.state.loading.status = true
      this.$store.state.loading.message = "Sending you an email."
      this.$axios.$post('https://southerntiersummit.com/api/passwordReset.php?email=' + this.$auth.user.email).then(res => {
        console.log(res)
        this.$store.state.loading.message = res
        setTimeout(function () {
          app.$store.state.loading.status = false
        }, 2000);
      })


    },


  }
}
</script>

<style>

</style>
