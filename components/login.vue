<template>
<vk-grid id="login" gutter="large" class="uk-flex uk-flex-center uk-flex-middle uk-padding-large">
  <transition :enter-active-class="animateIn" :leave-active-class="animateOut" mode="out-in">
    <div class="uk-width-1-1 uk-width-2-3@m uk-margin-large uk-flex uk-flex-center uk-flex-middle" v-if="panel == 'reset'" key="1">
      <form class="blueGradient uk-padding-large" @submit.prevent>
        <vk-grid gutter="small" class="uk-flex uk-flex-center uk-flex-middle">
          <div class="uk-width-1-1 uk-text-center">
            <h3 class="cyan">RESET PASSWORD</h3>
          </div>
          <div class="uk-width-1-1">
            <label class="uk-form-label">EMAIL<vk-icon class="" icon="triangle-down"></vk-icon></label>
            <div class="uk-form-controls">
              <input class="uk-input" type="email" v-model="email" name="email" v-validate="'required|email|existsNot'">
              <transition name="fade" mode="out-in">
                <vk-icon v-show="errors.has('email')" icon="warning"></vk-icon>
              </transition>
              <transition name="fade" mode="out-in">
                <span v-show="errors.has('email')" class="error">{{ errors.first('email') }}</span>
              </transition>
            </div>
          </div>
          <div class="uk-width-1-1 uk-text-center uk-margin-medium-top uk-margin-small-bottom">
            <button @click.prevent="sendEmail()" class="uk-button title-bold">SEND EMAIL</button>
          </div>
          <div class="uk-width-1-1 uk-text-center panel-links">
            <p class="white title-bold"><a @click.prevent="changePanel('backward2')">Click here</a> go back to login.</p>
          </div>
        </vk-grid>
      </form>
    </div>

    <div class="uk-width-1-1 uk-width-2-3@m uk-margin-large uk-flex uk-flex-center uk-flex-middle" v-if="panel == 'login'" key="2">
      <form class="blueGradient uk-padding-large">
        <vk-grid gutter="small" class="uk-flex uk-flex-center uk-flex-middle">
          <div class="uk-width-1-1 uk-text-center">
            <h3 class="cyan">LOGIN</h3>
          </div>
          <div class="uk-width-1-1">
            <label class="uk-form-label">EMAIL<vk-icon class="" icon="triangle-down"></vk-icon></label>
            <div class="uk-form-controls">
              <input class="uk-input" type="email" v-model="email" name="email" v-validate="'required|email|existsNot'">
              <transition name="fade" mode="out-in">
                <vk-icon v-show="errors.has('email')" icon="warning"></vk-icon>
              </transition>
              <transition name="fade" mode="out-in">
                <span v-show="errors.has('email')" class="error">{{ errors.first('email') }}</span>
              </transition>
            </div>
          </div>
          <div class="uk-width-1-1">
            <label class="uk-form-label">PASSWORD<vk-icon icon="triangle-down"></vk-icon></label>
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
            <button @click.prevent="login()" class="uk-button title-bold">LOGIN</button>
            <!-- <button @click.prevent="$auth.loginWith('google')" class="uk-button title-bold">LOGIN WITH GOOGLE</button> -->
          </div>
          <div class="uk-width-1-1 uk-text-center panel-links">
            <p class="white title-bold">New here? <a @click.prevent="changePanel('forward')">Click here</a> to create a registration.</p>

            <p class="white title-bold">Forgot your password? <a @click.prevent="changePanel('reset')">Click here</a> to reset.</p>
          </div>
        </vk-grid>
      </form>
    </div>
    <div class="uk-width-1-1 uk-width-2-3@m uk-margin-large uk-flex uk-flex-center uk-flex-middle" v-if="panel == 'register'" key="3">
      <form class="blueGradient uk-padding-large">
        <vk-grid gutter="small" class="uk-flex uk-flex-center uk-flex-middle">
          <div class="uk-width-1-1 uk-text-center">
            <h3 class="cyan">REGISTER</h3>
          </div>
          <div class="uk-width-1-1">
            <label class="uk-form-label">EMAIL<vk-icon class="" icon="triangle-down"></vk-icon></label>
            <div class="uk-form-controls">
              <input class="uk-input" type="email" v-model="email" name="email" v-validate="'required|email|exists'">
              <transition name="fade" mode="out-in">
                <vk-icon v-show="errors.has('email')" icon="warning"></vk-icon>
              </transition>
              <transition name="fade" mode="out-in">
                <span v-show="errors.has('email')" class="error">{{ errors.first('email') }}</span>
              </transition>
            </div>
          </div>
          <div class="uk-width-1-1 ">
            <label class="uk-form-label">PASSWORD<vk-icon icon="triangle-down"></vk-icon></label>
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
          <div class="uk-width-1-1">
            <vk-grid gutter="small">
              <div class="uk-width-1-2@m">
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
              <div class="uk-width-1-2@m">
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
              <div class="uk-width-1-2">
                <label class="uk-form-label">COMPANY<vk-icon icon="triangle-down"></vk-icon></label>
                <div class="uk-form-controls">
                  <input class="uk-input" type="text" v-model="company" name="company" v-validate="'required'">
                  <transition name="fade" mode="out-in">
                    <vk-icon v-show="errors.has('company')" icon="warning"></vk-icon>
                  </transition>
                  <transition name="fade" mode="out-in">
                    <span v-show="errors.has('company')" class="error">Company is required.</span>
                  </transition>
                </div>
              </div>
              <div class="uk-width-1-2 zip uk-margin-bottom">
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


                    <option>SELECT INDUSTRY</option>
                    <option value="Advanced Manufacturing">Advanced Manufacturing</option>
                    <option value="Agriculture &amp; Beer &amp; Wine">Agriculture &amp; Beer &amp; Wine</option>
                    <option value="Healthcare &amp; Life Sciences">Healthcare &amp; Life Sciences</option>
                    <option value="Education">Education</option>
                    <option value="Energy &amp; Smart Energy">Energy &amp; Smart Energy</option>
                    <option value="Culture, Sports, Entertainment, Tourism">Culture, Sports, Entertainment, Tourism</option>
                    <option value="Advanced Materials">Advanced Materials</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Business &amp; Professional Services">Business &amp; Professional Services</option>
                    <option value="Media, It, AI, &amp; Communications">Media, It, AI, &amp; Communications</option>
                  </select>
                  <transition name="fade" mode="out-in">
                    <span v-show="errors.has('location')" class="error">INDUSTRY IS REQUIRED.</span>
                  </transition>
                </div>
              </div>
            </vk-grid>
          </div>
          <div class="uk-width-1-1 uk-text-center uk-margin-small-top uk-margin-small-bottom">
            <button @click.prevent="register()" class="uk-button title-bold">SUBMIT</button>
          </div>
          <div class="uk-width-1-1 uk-text-center panel-links">
            <p class="white title-bold">Already registered? <a @click.prevent="changePanel('backward')">Click here</a> to login.</p>
          </div>
        </vk-grid>
      </form>

    </div>
  </transition>
</vk-grid>
</template>

<script>
import moment from 'moment'
import {
  Validator
} from 'vee-validate';
import axios from 'axios'




const isThere = (value) => {
  return axios.get('https://southerntiersummit.com/manage/api/1.1/tables/directus_users/rows/?filters[email][eq]=' + value).then((res) => {
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

Validator.extend('exists', {
  validate: isThere,
  getMessage: (field, params, data) => {
    return data.message;
  }
});

const isNotThere = (value) => {
  return axios.get('https://southerntiersummit.com/manage/api/1.1/tables/directus_users/rows/?filters[email][eq]=' + value).then((res) => {
    var okay;
    if (res.data.data.length > 0) {
      okay = true
    } else {
      okay = false
    }
    return {
      valid: okay,
      data: {
        message: 'Email is not registered.'
      }
    };

  });
};

Validator.extend('existsNot', {
  validate: isNotThere,
  getMessage: (field, params, data) => {
    return data.message;
  }
});


export default {

  data() {
    return {
      panel: 'login',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      company: '',
      zip: '',
      location: '',
      animateOut: 'uk-animation-slide-left-medium uk-animation-reverse uk-animation-fast',
      animateIn: 'uk-animation-slide-right-medium uk-animation-fast'
    }
  },
  created() {},
  components: {},
  mounted() {

  },
  methods: {
    formatDate(data) {
      var newDate = moment(data)
      return moment(newDate).format('dddd MMMM D, YYYY')
    },
    register() {
      var app = this
      this.$validator.validateAll().then((result) => {
        if (result) {
          app.$axios({
            method: 'post',
            url: '/tables/directus_users/rows/',
            data: {
              email: this.email,
              password: this.password,
              first_name: this.first_name,
              last_name: this.last_name,
              position: this.company,
              zip: this.zip,
              location: this.location
            },
            headers: {
              'Authorization': 'Bearer cCvD7emgpu8RebERqC8voTjUP1xvyVdB'
            }
          }).then(res => {
            if (res.status == 200) {
              // this.$store.state.loading.message = 'We are saving your information.'
              app.$auth.loginWith('local', {
                data: {
                  email: app.email,
                  password: app.password
                }
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
    sendEmail() {
      var app = this
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.state.loading.status = true
          this.$store.state.loading.message = "Generating the email."
          axios.post('https://southerntiersummit.com/api/passwordReset.php?email=' + this.email).then(res => {
            console.log(res)
            this.$store.state.loading.message = res.data
            this.animateIn = 'uk-animation-slide-right-medium uk-animation-fast'
            this.animateOut = 'uk-animation-slide-left-medium uk-animation-reverse uk-animation-fast'
            this.panel = 'login'
            setTimeout(function () {
              app.$store.state.loading.status = false
            }, 2000);
          })
        }
      })

    },
    login() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
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
    changePanel(direction) {
      console.log('Test' + direction)
      if (direction === 'forward') {
        this.panel = 'register'
        this.animateIn = 'uk-animation-slide-right-medium uk-animation-fast'
        this.animateOut = 'uk-animation-slide-left-medium uk-animation-reverse uk-animation-fast'
      } else if (direction === 'backward') {
        this.panel = 'login'
        this.animateIn = 'uk-animation-slide-left-medium uk-animation-fast'
        this.animateOut = 'uk-animation-slide-right-medium uk-animation-reverse uk-animation-fast'
      } else if (direction === 'reset') {
        this.panel = 'reset'
        this.animateIn = 'uk-animation-slide-left-medium uk-animation-fast'
        this.animateOut = 'uk-animation-slide-right-medium uk-animation-reverse uk-animation-fast'
      } else if (direction === 'backward2') {
        this.panel = 'login'
        this.animateIn = 'uk-animation-slide-right-medium uk-animation-fast'
        this.animateOut = 'uk-animation-slide-left-medium uk-animation-reverse uk-animation-fast'
      }
    }


  }
}
</script>

<style>

</style>
