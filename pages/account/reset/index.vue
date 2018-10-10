<template>
<vk-grid id="email" gutter="large" class="uk-flex uk-flex-center uk-flex-column uk-margin-remove-top">
  <div class="uk-width-1-1 uk-flex uk-flex-center uk-flex-middle uk-flex-column uk-margin-remove-top white">


    <div v-if="this.$auth.loggedIn" class="uk-text-center">
      <h1 class="white">PASSWORD RESET</h1>
      <p class="title white uk-text-uppercase">YOU ARE ALREADY LOGGED IN WITH {{this.$auth.user.email}}.</p>
      <nuxt-link to="/account/" class="uk-button uk-button-default title">VIEW ACCOUNT</nuxt-link>
    </div>
    <div v-else-if="user.data.length > 0">
      <form class="blueGradient uk-padding-large">
        <vk-grid gutter="small" class="uk-flex uk-flex-center uk-flex-middle">
          <div class="uk-width-1-1 uk-text-center">
            <h3 class="cyan">RESET PASSWORD</h3>
          </div>
          <p class="uk-width-1-1">We found your account registered with: <span class="title-bold">{{user.data[0].email}}</span>.  Enter your new password below.</p>
          <div class="uk-width-1-1">
            <label class="uk-form-label">NEW PASSWORD<vk-icon icon="triangle-down"></vk-icon></label>
            <div class="uk-form-controls">
              <input class="uk-input" type="text" v-model="password" name="password" v-validate="'required|min:6'">
              <transition name="fade" mode="out-in">
                <vk-icon v-show="errors.has('password')" icon="warning"></vk-icon>
              </transition>
              <transition name="fade" mode="out-in">
                <span v-show="errors.has('password')" class="error">Must be at least 6 characters.</span>
              </transition>
            </div>
          </div>
          <div class="uk-width-1-1 uk-text-center uk-margin-medium-top uk-margin-small-bottom">
            <button @click.prevent="resetPassword()" class="uk-button title-bold">RESET PASSWORD</button>
          </div>
        </vk-grid>
      </form>
    </div>
    <div v-else class="uk-text-center">
      <p>There is no registration with the email: {{email}}.</p>
      <nuxt-link to="/account/login/" class="uk-button uk-button-default title">REGISTER NEW ACCOUNT</nuxt-link>
    </div>


  </div>

</vk-grid>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import atob from 'atob'

export default {
  auth: false,
  async asyncData({
    params
  }) {
    const email = params.email
    let {
      data
    } = await axios.get('https://southerntiersummit.com/manage/api/1.1/tables/directus_users/rows/?filters[email][eq]=' + atob(params.email))
    return {
      user: data,
      email: atob(params.email)
    }
  },
  data() {
    return {
      password: ''
    }
  },
  created() {

  },
  components: {},
  mounted() {


  },
  methods: {
    resetPassword() {
      var app = this
      this.$validator.validateAll().then((result) => {
        if (result) {
          app.$axios({
            method: 'put',
            url: '/tables/directus_users/rows/' + this.user.data[0].id,
            data: {
              password: this.password,
            },
            headers: {
              'Authorization': 'Bearer cCvD7emgpu8RebERqC8voTjUP1xvyVdB'
            }
          }).then(res => {
            console.log(res);
            if (res.status == 200) {
              this.$store.state.loading.status = true

              app.$auth.loginWith('local', {
                  data: {
                    email: app.email,
                    password: app.password
                  }
                })
                .then(function() {
                app.$store.state.loading.status = false
                app.$router.push('/account/')
              })
            }
          })
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
    },
  }
}
</script>

<style>

</style>
