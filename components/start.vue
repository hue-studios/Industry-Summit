<template>
<vk-grid gutter="small" class="uk-flex uk-flex-center uk-flex-middle uk-flex-column">
  <div class="uk-width-5-6 uk-width-2-3@m uk-flex uk-flex-center">
    <form id="registerForm" class="uk-padding-large blueGradient" autocomplete="off" @click.prevent>
      <vk-grid gutter="small">
        <div class="uk-width-1-1 uk-margin-top">
          <label class="uk-form-label">SPONSORSHIP LEVEL<vk-icon icon="triangle-down"></vk-icon></label>
          <div class="uk-form-controls">

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
        <div class="uk-width-1-2@m">
          <label class="uk-form-label">EMAIL<vk-icon class="" icon="triangle-down"></vk-icon></label>
          <div class="uk-form-controls">
            <input class="uk-input" type="email" v-model="email" name="email"  v-validate="'required|email|unique'">
            <transition name="fade" mode="out-in">
              <vk-icon v-show="errors.has('email')" icon="warning"></vk-icon>
            </transition>
            <transition name="fade" mode="out-in">
              <span v-show="errors.has('email')" class="error">{{ errors.first('email') }}</span>
            </transition>
          </div>
        </div>
        <div class="uk-width-1-2@m uk-margin-bottom uk-margin-remove-bottom@m">
          <label class="uk-form-label">PASSWORD<vk-icon icon="triangle-down"></vk-icon></label>
          <div class="uk-form-controls">
            <input class="uk-input" type="password" v-model="password" name="password"  v-validate="'required|min:6'">
            <transition name="fade" mode="out-in">
              <vk-icon v-show="errors.has('password')" icon="warning"></vk-icon>
            </transition>
            <transition name="fade" mode="out-in">
              <span v-show="errors.has('password')" class="error">Must be at least 6 characters.</span>
            </transition>
          </div>
        </div>
      </vk-grid>
    </form>
  </div>
  <div class="uk-width-1-1 uk-text-center registration-buttons">
    <!-- <button class="uk-button uk-button-default back-btn" @click.prevent="goBack()"><vk-icon icon="chevron-left" ratio="1"></vk-icon>GO BACK</button> -->

    <button class="uk-button uk-button-default continue-btn" @click.prevent="register()">CONTINUE <vk-icon icon="chevron-right" ratio="1"></vk-icon></button>
  </div>
</vk-grid>
</template>

<script>
import {
  Validator
} from 'vee-validate';
import axios from 'axios'


export default {

  data() {
    return {
      email: '',
      password: '',
      sponsorship: this.$store.state.sponsorship.title
    }
  },
  mounted() {},
  created () {
    var app = this
    const isUnique = (value) => {
      return axios.get('https://southerntiersummit.com/manage/api/1.1/tables/sponsors/rows/?filters[user_id.email][eq]=' + value + '&filters[event_id.id][eq]=1').then((res) => {
        var okay;
        if (res.data.data.length > 0) {
          okay = false

        } else {
          okay = true

        }
        axios.get('https://southerntiersummit.com/manage/api/1.1/tables/directus_users/rows/?filters[email][eq]=' + value).then((response) => {
          if (response.data.data.length > 0) {
            this.$store.commit('SET_TEMP_USER', response.data.data[0])
          } else {
            this.$store.commit('SET_TEMP_USER', {
              email: this.email,
              password: this.password
            })
          }
        });
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
  },
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
      } else {
        this.$store.commit('SET_SPONSORSHIP', '')
      }
    },
    register() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.commit('SET_TEMP_PASS', this.password)
          this.$store.state.panel = 2;
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
