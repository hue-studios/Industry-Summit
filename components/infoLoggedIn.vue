<template>
<vk-grid gutter="small" class="uk-flex uk-flex-center uk-flex-middle uk-flex-column">
  <div class="uk-width-5-6 uk-width-2-3@m uk-flex uk-flex-center">
    <form id="registerForm" class="uk-padding-large blueGradient" autocomplete="off" @submit.prevent>
      <vk-grid gutter="small">
        <div class="uk-width-1-1 uk-text-center uk-margin-small-top uk-margin-small-bottom">
          <p class="white">Select your sponsorship and enter your password to continue.</p>

        </div>
        <div class="uk-width-1-1 uk-width-1-2@s uk-margin-top">
          <label class="uk-form-label">SPONSORSHIP LEVEL<vk-icon icon="triangle-down"></vk-icon></label>

          <div class="uk-form-controls" v-if="this.$auth.user.email == 'petervhoffman@gmail.com'">

            <select class="uk-select" v-model="sponsorship" name="sponsorship"  size="1" @change="updateSponsorship()" v-validate="'required'">
                <option selected>SELECT SPONSORSHIP LEVEL</option>
                <option value="test">TEST</option>
              </select>
            <transition name="fade" mode="out-in">
              <span v-show="errors.has('sponsorship')" class="error">{{ errors.first('sponsorship') }}</span>
            </transition>
          </div>
          <div class="uk-form-controls" v-else>

            <select class="uk-select" v-model="sponsorship" name="sponsorship"  size="1" @change="updateSponsorship()" v-validate="'required'">

                <option v-if="this.$store.state.sponsorship.title" :value="$store.state.sponsorship.title" selected class="uk-text-uppercase">{{this.$store.state.sponsorship.title}} SPONSOR - ${{this.$store.state.sponsorship.price}} </option>
                <option selected>SELECT SPONSORSHIP LEVEL</option>
                <option v-if="$store.state.sponsorship.title !== 'conference'" value="conference">CONFERENCE SPONSOR - $1000</option>
                <option v-if="$store.state.sponsorship.title !== 'booth'" value="booth">BOOTH SPONSOR - $250</option>
                <option v-if="$store.state.sponsorship.title !== 'non-profit'" value="non-profit">NON-PROFIT SPONSOR - $100</option>
              </select>
            <transition name="fade" mode="out-in">
              <span v-show="errors.has('sponsorship')" class="error">{{ errors.first('sponsorship') }}</span>
            </transition>
          </div>

        </div>

        <div class="uk-width-1-1 uk-width-1-2@s uk-margin-top">
          <label class="uk-form-label">PASSWORD<vk-icon icon="triangle-down"></vk-icon></label>
          <div class="uk-form-controls">
            <input class="uk-input" type="password" v-model="password" name="password"  v-validate="'required|min:6'" >
            <transition name="fade" mode="out-in">
              <vk-icon v-show="errors.has('password')" icon="warning"></vk-icon>
            </transition>
            <transition name="fade" mode="out-in">
              <span v-show="errors.has('password')" class="error">Must be at least 6 characters.</span>
            </transition>
          </div>
        </div>
        <div class="uk-width-1-1 uk-margin-medium-top ">
          <vk-grid class="uk-text-center uk-flex uk-flex-center uk-flex uk-flex-middle">
            <div class="uk-width-1-1 uk-margin-remove-bottom">
              <h5 class="cyan uk-margin-small-bottom">USER INFO <vk-icon icon="triangle-down"></vk-icon></h5>
            </div>
            <div class="uk-margin-remove-top"><h5 class="white title-bold"> <span class="title">EMAIL: </span> {{this.$auth.user.email}}</h5></div>
            <div class="uk-margin-remove-top "><h5 class="white title-bold"> <span class="title">NAME: </span>{{this.$auth.user.first_name}} {{this.$auth.user.last_name}}</h5></div>
            <div class="uk-margin-remove-top"><h5 class="white title-bold"> <span class="title">COMPANY: </span> {{this.$auth.user.position}}</h5></div>
          </vk-grid>
        </div>


      </vk-grid>
    </form>
  </div>

  <div class="uk-width-1-1 uk-text-center registration-buttons">
    <!-- <button class="uk-button uk-button-default back-btn" @click.prevent="goBack()"><vk-icon icon="chevron-left" ratio="1"></vk-icon>GO BACK</button> -->

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
  return axios.get('https://southerntiersummit.com/manage/api/1.1/tables/sponsors/rows/?filters[user_id.email][eq]=' + value + '&filters[event_id.id][eq]=1').then((res) => {
    var okay;
    if (res.data.data.length > 0) {
      okay = false

    } else {
      okay = true
    }
    return {
      valid: okay,
      data: {
        message: 'Email is already registered as a sponsor.'
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
      email: this.$auth.user.email,
      password: this.$auth.user.password,
      first_name: this.$auth.user.first_name,
      last_name: this.$auth.user.last_name,
      company: this.$auth.user.position,
      // city: this.$store.state.temp_user.city,
      // state: this.$store.state.temp_user.state,
      zip: this.$auth.user.zip,
      sponsorship: this.$store.state.sponsorship.title
    }
  },
  mounted() {},
  methods: {
    goBack() {
      this.$store.commit('changePanel', 'backward')
    },
    updateSponsorship() {
      if (this.sponsorship == 'conference') {
        this.$store.commit('SET_SPONSORSHIP', {
          title: 'Conference',
          price: '1000',
          event: 'Introduction',
          date: 'November 28, 2018',
          registrations: 20,
          sponsorship_level: 1

        })
      } else if (this.sponsorship == 'booth') {
        this.$store.commit('SET_SPONSORSHIP', {
          title: 'Booth',
          price: '250',
          event: 'Introduction',
          date: 'November 28, 2018',
          registrations: 5,
          sponsorship_level: 2

        })
      } else if (this.sponsorship == 'non-profit') {
        this.$store.commit('SET_SPONSORSHIP', {
          title: 'Non-Profit',
          price: '100',
          event: 'Introduction',
          date: 'November 28, 2018',
          registrations: 2,
          sponsorship_level: 3

        })
      } else if (this.sponsorship == 'test') {
        this.$store.commit('SET_SPONSORSHIP', {
          title: 'Test',
          price: '1',
          event: 'Introduction',
          date: 'November 28, 2018',
          registrations: 1,
          sponsorship_level: 4

        })
      } else {
        this.$store.commit('SET_SPONSORSHIP', '')
      }
    },
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
            zip: this.zip
          })
          this.$store.state.panel = 3;
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
