<template>
<vk-grid gutter="small" class="uk-flex uk-flex-center uk-flex-middle uk-flex-column">
  <div class="uk-width-5-6 uk-width-2-3@m uk-flex uk-flex-center ">
    <form id="registerForm" class="uk-flex uk-flex-center uk-flex-middle uk-width-1-1 uk-padding-large blueGradient " autocomplete="off" @click.prevent>
      <vk-grid class="uk-width-1-1" gutter="small">

        <div class="uk-width-1-2@m">
          <label class="uk-form-label">EMAIL<vk-icon class="" icon="triangle-down"></vk-icon></label>
          <div class="uk-form-controls">
            <input class="uk-input" type="email" v-model="email" name="email" v-validate="'required|email|unique'">
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
            <input class="uk-input" type="password" v-model="password" name="password" v-validate="'required|min:6'">
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
    <button class="uk-button uk-button-default back-btn" @click.prevent="goBack()">
      <vk-icon icon="chevron-left" ratio="1"></vk-icon>GO BACK
    </button>

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
      password: ''
      // industry: ''
    }
  },
  mounted() {},
  created() {
    var app = this
    const isUnique = (value) => {
      return axios.get('https://southerntiersummit.com/manage/api/1.1/tables/registrations/rows/?filters[user_id.email][eq]=' + value + '&filters[event_id.id][eq]=1&filters[payment_status][eq]=PAID').then((res) => {
        var okay;
        if (res.data.data.length > 0) {
          okay = false

        } else {
          okay = true

        }
        axios.get('https://southerntiersummit.com/manage/api/1.1/tables/directus_users/rows/?filters[email][eq]=' + value).then((response) => {
          if (response.data.data.length > 0) {
            this.$store.commit('SET_TEMP_USER', response.data.data[0])
            // this.$store.commit('SET_TEMP_USER_LOCATION', this.industry)
          } else {
            this.$store.commit('SET_TEMP_USER', {
              email: this.email,
              password: this.password,
              // location: this.industry
            })
          }
        });
        return {
          valid: okay,
          data: {
            message: 'Email is already registered for this event.'
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
      this.$store.commit('changeRegistrationPanel', 'backward')
    },
    // updateIndustry() {
    //   var app = this
    //   console.log(this.industry)
    //   this.$store.commit('SET_INDUSTRY', this.industry)
    //
    // },
    register() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.commit('SET_TEMP_PASS', this.password)
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
