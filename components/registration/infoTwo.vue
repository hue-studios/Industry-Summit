<template>
<vk-grid gutter="small" class="uk-flex uk-flex-center uk-flex-middle uk-flex-column">
  <div class="uk-width-5-6 uk-width-2-3@m uk-flex uk-flex-center">
    <form id="registerForm" class="blueGradient uk-padding-large" autocomplete="off" @click.prevent>
      <vk-grid gutter="small" class="uk-flex uk-flex-center uk-flex-middle">
        <div class="uk-width-1-1 uk-text-center uk-margin-small-bottom">
          <h3 class="white uk-margin-remove-bottom">REGISTRATION</h3>
          <h5 class="white uk-margin-remove-top">INDUSTRY SUMMIT: {{this.$store.state.event.title}}</h5>
        </div>
        <transition mode="out-in" enter-active-class="uk-animation-slide-top-small" leave-active-class="uk-animation-slide-top-small uk-animation-reverse">
          <div class="uk-width-1-1 uk-flex uk-flex-center uk-flex-middle uk-height-small" v-if="registered == 0" key="1">
            <vk-spinner ratio=1.5 class="white"></vk-spinner>
          </div>
          <div class="uk-width-1-1" v-if="registered == 1" key="2">
            <vk-grid>
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
                    <span v-show="errors.has('position')" class="error">Required</span>
                  </transition>

                </div>
              </div>
              <div class="zip uk-margin-small-top">
                <label class="uk-form-label uk-width-auto">ZIP<vk-icon icon="triangle-down"></vk-icon></label>
                <div class="uk-form-controls">
                  <input class="uk-input" v-model="zip" name="zip" maxlength="5" type="number" v-validate="'required|length:5'">
                  <transition name="fade" mode="out-in">
                    <vk-icon v-show="errors.has('zip')" icon="warning"></vk-icon>
                  </transition>
                  <transition name="fade" mode="out-in">
                    <span v-show="errors.has('zip')" class="error">{{ errors.first('zip') }}</span>
                  </transition>
                </div>
              </div>
              <div class="uk-width-1-1 uk-margin-bottom uk-margin-small-top uk-width-auto@s uk-margin-top">
                <label class="uk-form-label">INDUSTRY<vk-icon icon="triangle-down"></vk-icon></label>
                <div class="uk-form-controls">
                  <select class="uk-select" v-model="location" name="location" size="1" v-validate="'required'">

                    <option v-if="this.$store.state.temp_user.location" :value="this.$store.state.temp_user.location" selected>{{$store.state.temp_user.location}}</option>
                    <option v-else>SELECT INDUSTRY</option>
                    <option v-if="this.$store.state.temp_user.location !== 'Advanced Manufacturing'" value="Advanced Manufacturing">Advanced Manufacturing</option>
                    <option v-if="this.$store.state.temp_user.location !== 'Agriculture &amp; Beer &amp; Wine'" value="Agriculture &amp; Beer &amp; Wine">Agriculture &amp; Beer &amp; Wine</option>
                    <option v-if="this.$store.state.temp_user.location !== 'Healthcare &amp; Life Sciences'" value="Healthcare &amp; Life Sciences">Healthcare &amp; Life Sciences</option>
                    <option v-if="this.$store.state.temp_user.location !== 'Education'" value="Education">Education</option>
                    <option v-if="this.$store.state.temp_user.location !== 'Energy &amp; Smart Energy'" value="Energy &amp; Smart Energy">Energy &amp; Smart Energy</option>
                    <option v-if="this.$store.state.temp_user.location !== 'Culture, Sports, Entertainment, Tourism'" value="Culture, Sports, Entertainment, Tourism">Culture, Sports, Entertainment, Tourism</option>
                    <option v-if="this.$store.state.temp_user.location !== 'Advanced Materials'" value="Advanced Materials">Advanced Materials</option>
                    <option v-if="this.$store.state.temp_user.location !== 'Financial Services'" value="Financial Services">Financial Services</option>
                    <option v-if="this.$store.state.temp_user.location !== 'Business &amp; Professional Services'" value="Business &amp; Professional Services">Business &amp; Professional Services</option>
                    <option v-if="this.$store.state.temp_user.location !== 'Media, It, AI, &amp; Communications'" value="Media, It, AI, &amp; Communications">Media, It, AI, &amp; Communications</option>
                  </select>
                  <transition name="fade" mode="out-in">
                    <span v-show="errors.has('location')" class="error">INDUSTRY IS REQUIRED.</span>
                  </transition>
                </div>

              </div>
            </vk-grid>
          </div>

          <div class="uk-width-1-1 uk-margin-remove-top  " v-if="registered == 2" key="3">
            <vk-grid class="uk-flex uk-flex-center">
              <div class="uk-width-1-1 uk-margin-remove-bottom uk-text-center">
                <h5 class="cyan uk-margin-small-top uk-margin-small-bottom">USER INFO <vk-icon icon="triangle-down"></vk-icon></h5>
              </div>
              <div class="uk-margin-remove-top">
                <h5 class="white title-bold"> <span class="title">EMAIL: </span> {{this.$store.state.temp_user.email}}</h5>
              </div>
              <div class="uk-margin-remove-top">
                <h5 class="white title-bold"> <span class="title">NAME: </span>{{this.$store.state.temp_user.first_name}} {{this.$store.state.temp_user.last_name}}</h5>
              </div>
              <div class="uk-margin-remove-top">
                <h5 class="white title-bold"> <span class="title">COMPANY: </span> {{this.$store.state.temp_user.position}}</h5>
              </div>
              <div class="uk-margin-remove-top">
                <h5 class="white title-bold"> <span class="title">INDUSTRY: </span> {{this.$store.state.temp_user.location}}</h5>
              </div>
            </vk-grid>
          </div>
        </transition>
      </vk-grid>
    </form>
  </div>
  <div class="uk-width-1-1 uk-text-center registration-buttons">
    <button class="uk-button uk-button-default back-btn" @click.prevent="goBack()">
      <vk-icon icon="chevron-left" ratio="1"></vk-icon>GO BACK
    </button>

    <button class="uk-button uk-button-default continue-btn" @click.prevent="register()">CONTINUE <vk-icon icon="chevron-right" ratio="1"></vk-icon></button>
  </div>
    <transition mode="out-in" enter-active-class="uk-animation-slide-top-small" leave-active-class="uk-animation-slide-top-small uk-animation-reverse">
  <div class="uk-width-1-1 uk-text-center uk-margin-large-bottom" v-if="registered == 2">
    <p class="white title" style="font-size: 16px;">You are registering with an existing account: <span class="title-bold white">{{this.$store.state.temp_user.email}}</span>. Manage your information on your <nuxt-link to="/account/" class="cyan" style="text-decoration: underline;">account page</nuxt-link>. </p>
  </div>
</transition>
</vk-grid>
</template>

<script>
import {
  Validator
} from 'vee-validate';
import axios from 'axios'

const isUnique = (value) => {
  return axios.get('https://southerntiersummit.com/manage/api/1.1/tables/registrations/rows/?filters[user_id.email][eq]=' + value).then((res) => {
    var okay;
    if (res.data.data.length > 0) {
      okay = false

    } else {
      okay = true
    }
    return {
      valid: okay,
      data: {
        message: 'Email is already registered.'
      },
    };

  });
};

Validator.extend('unique', {
  validate: isUnique,
  getMessage: (field, params, data) => {
    return data.message;
  }
});

export default {
  data() {
    return {
      email: this.$store.state.temp_user.email,
      password: this.$store.state.temp_user.password,
      first_name: this.$store.state.temp_user.first_name,
      last_name: this.$store.state.temp_user.last_name,
      position: this.$store.state.temp_user.position,
      zip: this.$store.state.temp_user.zip,
      location: this.$store.state.temp_user.location,
      registered: 0
    }
  },
  mounted() {

  },
  created () {
    var app = this
    axios.get('https://southerntiersummit.com/manage/api/1.1/tables/directus_users/rows/?filters[email][eq]=' + this.$store.state.temp_user.email).then((response) => {
      if (response.data.data.length > 0) {
        this.$store.commit('SET_TEMP_USER', response.data.data[0])
        this.registered = 2
      } else {
        this.registered = 1
        this.$store.commit('SET_TEMP_USER', {
          email: this.$store.state.temp_user.email,
          password: this.$store.state.temp_user.password,
          first_name: this.first_name,
          last_name: this.last_name,
          position: this.company,
          zip: this.zip,
          location: this.location
        })
      }
    });
  },
  methods: {
    goBack() {
      this.$store.commit('changeRegistrationPanel', 'backward')
    },
    register() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.commit('SET_TEMP_USER', {
            email: this.email,
            password: this.password,
            first_name: this.first_name,
            last_name: this.last_name,
            position: this.position,
            zip: this.zip,
            location: this.location
          })
          this.$store.state.registrationPanel = 4;
        } else {
          this.$notify.warning({
            title: 'Ummm sorry.',
            message: 'You need to make sure the form is completed correctly.',
            overlay: true,
            position: 'bottomRight',
            icon: 'ico-warning'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
