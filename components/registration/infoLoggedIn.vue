<template>
<vk-grid gutter="small" class="uk-flex uk-flex-center uk-flex-middle uk-flex-column">
  <div class="uk-width-5-6 uk-width-2-3@m uk-flex uk-flex-center">
    <form id="registerForm" class="blueGradient uk-padding-large" autocomplete="off" @click.prevent>
      <vk-grid gutter="small">
          <div class="uk-width-1-1 uk-text-center uk-margin-small-top uk-margin-small-bottom">
            <p class="white">Select your industry and enter your password to continue.</p>



        </div>
        <div class="uk-width-1-2@m uk-margin-medium-top">
          <label class="uk-form-label">INDUSTRY<vk-icon icon="triangle-down"></vk-icon></label>

          <div class="uk-form-controls">
            <input class="uk-input" type="text" v-model="industry" name="industry" readonly>


          </div>

        </div>
        <div class="uk-width-1-2@m uk-margin-medium-top">
          <label class="uk-form-label">PASSWORD<vk-icon icon="triangle-down"></vk-icon></label>
          <div class="uk-form-controls">
            <input class="uk-input" type="text" v-model="password" name="password"  v-validate="'required|min:6'">
            <transition name="fade" mode="out-in">
              <vk-icon v-show="errors.has('password')" icon="warning"></vk-icon>
            </transition>
            <transition name="fade" mode="out-in">
              <span v-show="errors.has('password')" class="error">Must be at least 6 characters.</span>
            </transition>
          </div>
        </div>
<!--
        <div class="uk-width-1-1 uk-margin-medium-top ">
          <vk-grid>
            <div class="uk-width-1-1 uk-margin-remove-bottom">
              <h5 class="cyan uk-margin-small-bottom">USER INFO <vk-icon icon="triangle-down"></vk-icon></h5>
            </div>
            <div class="uk-margin-remove-top"><h5 class="white title-bold"> <span class="title">EMAIL: </span> {{this.$auth.user.email}}</h5></div>
            <div class="uk-margin-remove-top"><h5 class="white title-bold"> <span class="title">NAME: </span>{{this.$auth.user.first_name}} {{this.$auth.user.last_name}}</h5></div>
            <div class="uk-margin-remove-top"><h5 class="white title-bold"> <span class="title">COMPANY: </span> {{this.$auth.user.position}}</h5></div>
          </vk-grid>
        </div> -->

      </vk-grid>
    </form>
  </div>
  <div class="uk-width-1-1 uk-text-center registration-buttons">
    <button class="uk-button uk-button-default back-btn" @click.prevent="goBack()"><vk-icon icon="chevron-left" ratio="1"></vk-icon>GO BACK</button>

    <button class="uk-button uk-button-default continue-btn" @click.prevent="register()">CONTINUE <vk-icon icon="chevron-right" ratio="1"></vk-icon></button>
  </div>
  <div class="uk-width-1-1 uk-text-center uk-margin-large-bottom">
    <p class="white title" style="font-size: 16px;">You are currently logged in with <span class="title-bold white">{{this.$auth.user.email}}</span>.  Manage your information on your <nuxt-link to="/account/" class="cyan" style="text-decoration: underline;">account page</nuxt-link>. </p>
  </div>
</vk-grid>
</template>

<script>
import {
  Validator
} from 'vee-validate';
import axios from 'axios'

const isUnique = (value) => {
  return axios.get('https://southerntiersummit.com/manage/api/1.1/tables/registrations/rows/?filters[user_id.email][eq]=' + value + '&filters[event_id.id][eq]=1').then((res) => {
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
      }
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
      email: this.$auth.user.email,
      password: this.$auth.user.password,
      first_name: this.$auth.user.first_name,
      last_name: this.$auth.user.last_name,
      company: this.$auth.user.position,
      zip: this.$auth.user.zip,
      industry: this.$auth.user.location
    }
  },
  mounted() {
    this.$store.commit('SET_EVENT', {
      id: 1,
      title: 'Introduction',
      date: 'November 28, 2018',
      location: 'Holiday Inn Downtown Binghamton'
    })
  },
  methods: {
    goBack() {
      this.$store.commit('changeRegistrationPanel', 'backward')
    },
    // updateIndustry() {
    //   console.log(this.industry)
    //   this.$store.commit('SET_INDUSTRY', this.industry)
    //   // if (this.$auth.loggedIn) {
    //   //   app.$axios({
    //   //     method: 'post',
    //   //     url: '/tables/directus_users/rows/' + app.$auth.user.id,
    //   //     data: {
    //   //       location: app.industry
    //   //     }
    //   //   }).then(res => {
    //   //     console.log(res)
    //   //   })
    //   // }
    // },
    register() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.commit('SET_TEMP_USER', {
            email: this.email,
            password: this.password,
            first_name: this.first_name,
            last_name: this.last_name,
            position: this.company,
            // city: this.city,
            // state: this.state,
            zip: this.zip,
            industry: this.industry
          })
          this.$store.state.registrationPanel = 3;
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
