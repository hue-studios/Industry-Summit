<template>
<vk-grid id="checkout" class="uk-flex uk-flex-center uk-flex-middle">

  <div class="uk-width-1-1 uk-flex uk-flex-center">
    <form id="payment-form">
      <h5 class="white title-bold uk-text-center uk-margin-remove-bottom"><span class="dark-gray title">INDUSTRY SUMMIT:</span> {{$store.state.event.title}}</h5>
      <h5 class="white title-bold uk-text-center uk-margin-remove"><span class="dark-gray title"></span> {{$store.state.event.date}}</h5>
      <h5 class="white title-bold uk-text-center uk-margin-remove"><span class="dark-gray title">TOTAL:</span> $49</h5>
      <!-- <p class="title-bold uk-text-center" style="color: red; font-size: 12px;">THIS IS IN TEST MODE.  USE CARD # 4242 4242 4242 4242.</p> -->
      <fieldset>
        <legend class="condensed-bold card-only" data-tid="elements_examples.form.pay_with_card">ENTER CARD DETAILS</legend>
      <card class='stripe-card' id="card-element" :class='{ complete }' :options='options' stripe='pk_live_MuGfHPTboOqSuJLjF6S1sNzP' @change='complete = $event.complete' />
        <!-- Used to display form errors. -->
        <!-- <h5 class="white uk-text-center" v-if="status == 'failure'">SOMETHING WENT WRONG.</h5> -->
      </fieldset>
    </form>
  </div>
  <div class="uk-width-1-1 uk-text-center registration-buttons">
    <button class="uk-button uk-button-default back-btn" @click.prevent="goBack()"><vk-icon icon="chevron-left" ratio="1"></vk-icon>GO BACK</button>

    <button class="uk-button uk-button-default continue-btn pay-with-stripe" @click='pay' >PAY <vk-icon icon="chevron-right" ratio="1"></vk-icon></button>
  </div>
</vk-grid>
</template>
<script>
import {
  Card,
  createToken
} from 'vue-stripe-elements-plus'
import axios from 'axios'

export default {
  data() {
    return {
      complete: false,
      status: false,
      response: null,
      stripeCustomer: '',
      style: {
        base: {
          color: '#ffffff',
          lineHeight: '18px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#999999'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      },
      options: {
        base: {
          color: '#ffffff',
          lineHeight: '18px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#999999'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      }
    }
  },
  components: {
    Card
  },
  created() {
  },
  methods: {
    goBack() {
      this.$store.commit('changeRegistrationPanel', 'backward')
    },
    goForward() {
      this.$store.commit('changeRegistrationPanel', 'forward')
    },
    pay() {
      createToken().then(data => {
        if(data.token) {
          this.processPayment(data.token.id)
        } else {
          console.log(data.error.message)
          this.$notify.warning({
            title: 'Sorry.',
            message: data.error.message,
            overlay: true,
            position: 'bottomRight',
            icon: 'ico-warning'
          })
        }

      });
    },
    processPayment(token) {
      var app = this
      this.$store.state.loading.status = true
      axios.post(
          'https://southerntiersummit.com/api/?stripeToken=' + token + '&stripeAmt=4900&description=Registration for the Industry Summit hosted by Southern Tier 8.&email=' + this.$store.state.temp_user.email + '&first_name=' + this.$store.state.temp_user.first_name + '&last_name= '+ this.$store.state.temp_user.last_name + '&zip' + this.$store.state.temp_user.zip + ' &company=' + this.$store.state.temp_user.position + '&customerID=' + this.$store.state.customerID)
        .then(response => {
          app.stripeCustomer = response.data
          app.status = 'success';
          this.$store.state.loading.message = 'The Payment was successful.'
          if(app.$auth.loggedIn) {
            //if logged in but not registered - create registration
              this.$store.state.loading.message = 'Now we are creating your registration.'
              app.$axios({
                method: 'post',
                url: '/tables/registrations/rows/',
                data: {
                  event_id: 1,
                  user_id: app.$store.state.auth.user.id,
                  payment_status: 'PAID',
                  quantity: 1,
                  status: 1,
                  industry: app.$store.state.auth.user.location
                }
              }).then(response => {
                app.$axios({
                  method: 'post',
                  url: '/tables/payments/rows/',
                  data: {
                    user_id: app.$store.state.auth.user.id,
                    stripe_id: app.stripeCustomer,
                    status: 1
                  }
                }).then(response => {
                  app.$store.state.loading.status = false
                  app.$store.commit('changeRegistrationPanel', 'forward')
                }).catch(error => {
                  console.log(error)
                })
              }).catch(error => {
                console.log(error)
              })
          } else {
            // if not logged in - check if user exists then login, or create user and login, then post registration
            console.log('checking if user exists.' + app.$store.state.temp_pass + app.$store.state.temp_user.email)
            app.$axios('/tables/directus_users/rows/?filters[email][eq]=' + app.$store.state.temp_user.email).then(response => {
              console.log("THIS IS WHERE:: " + response.data.data.length)
              if(response.data.data.length > 0) {
                console.log('user exists just not logged in - now logging in and registering.')
                app.$store.state.loading.message = 'We are saving your information.'
                app.$auth.loginWith('local', {
                  data: {
                    email: app.$store.state.temp_user.email,
                    password: app.$store.state.temp_pass
                  }
                }).then(res => {
                  app.$store.state.loading.message = 'Now we are creating your registration.'
                  app.$axios({
                    method: 'post',
                    url: '/tables/registrations/rows/',
                    data: {
                      event_id: 1,
                      user_id: app.$store.state.auth.user.id,
                      payment_status: 'PAID',
                      quantity: 1,
                      status: 1,
                      industry: app.$store.state.auth.user.location
                    }
                  }).then(response => {
                    app.$axios({
                      method: 'post',
                      url: '/tables/payments/rows/',
                      data: {
                        user_id: app.$store.state.auth.user.id,
                        stripe_id: app.stripeCustomer,
                        status: 1
                      }
                    }).then(response => {
                      this.$store.state.loading.status = false
                      app.$store.commit('changeRegistrationPanel', 'forward')
                    }).catch(error => {
                      console.log(error)
                    })
                  }).catch(error => {
                    console.log(error)
                  })
                }).catch(error => {
                  console.log(error)
                })
              } else {
                console.log('user does not exist - now creating user, logging in, and creating registeration.')
                app.$axios({
                  method: 'post',
                  url: '/tables/directus_users/rows/',
                  data: app.$store.state.temp_user,
                  headers: {
                    'Authorization': 'Bearer cCvD7emgpu8RebERqC8voTjUP1xvyVdB'
                  }
                }).then(res => {
                  if (res.status == 200) {
                    app.$store.state.loading.message = 'We are saving your information.'
                    app.$auth.loginWith('local', {
                      data: {
                        email: app.$store.state.temp_user.email,
                        password: app.$store.state.temp_user.password
                      }
                    }).then(res => {
                      app.$store.state.loading.message = 'Now we are creating your registration.'
                      app.$axios({
                        method: 'post',
                        url: '/tables/registrations/rows/',
                        data: {
                          event_id: 1,
                          user_id: app.$store.state.auth.user.id,
                          payment_status: 'PAID',
                          quantity: 1,
                          status: 1,
                          industry: app.$store.state.auth.user.location
                        }
                      }).then(response => {
                        app.$axios({
                          method: 'post',
                          url: '/tables/payments/rows/',
                          data: {
                            user_id: app.$store.state.auth.user.id,
                            stripe_id: app.stripeCustomer,
                            status: 1
                          }
                        }).then(response => {
                          app.$store.state.loading.status = false
                          app.$store.commit('changeRegistrationPanel', 'forward')
                        }).catch(error => {
                          console.log(error)
                        })
                      }).catch(error => {
                        console.log(error)
                      })
                    }).catch(error => {
                      console.log(error)
                    })
                  } else {
                    console.log(res)
                    app.$notify.warning({
                      title: 'Ummm sorry.',
                      message: res,
                      overlay: true,
                      position: 'bottomRight',
                      icon: 'ico-warning'
                    })
                  }
                }).catch(error => {
                  console.log('ERROR:: ' + error);
                  app.$notify.warning({
                    title: 'Ummm sorry.',
                    message: error,
                    overlay: true,
                    position: 'bottomRight',
                    icon: 'ico-warning'
                  })
                });

              }
            })

          }

        }).catch(error => {
          console.log('ERROR:: ' + error);
          app.$notify.warning({
            title: 'Ummm sorry.',
            message: 'There was a connection problem.',
            overlay: true,
            position: 'bottomRight',
            icon: 'ico-warning'
          })
          app.$store.state.loading.status = false
        });
    }
  }
}
</script>
<style scoped lang="scss">
$blue: #243457;
$blue2: #003F7F;
#payment-form {
    width: 375px;

    .StripeElement {
        background-color: rgba(0,0,0,0.4);

        padding: 15px 12px;
        border-radius: 4px;
        border: 1px solid $blue2;

        transition: box-shadow 150ms ease;
    }
    .StripeElement#payment-request-button {
      background-color: rgba(255,255,255,1);
      border: none;
      padding: 0;
    }
    .StripeElement--focus {

    }

    .StripeElement--invalid {
        border-color: #fa755a;
    }

    .StripeElement--webkit-autofill {
        background-color: #fefde5 !important;
    }
    button {
        border: none;
        border-radius: 4px;
        outline: none;
        text-decoration: none;
        color: #fff;
        background: $blue;
        white-space: nowrap;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        padding: 0 14px;
        // box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
        border-radius: 4px;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.025em;
        text-decoration: none;
        -webkit-transition: all 150ms ease;
        transition: all 150ms ease;
        float: left;
        margin-left: 12px;
        margin-top: 28px;
    }
    fieldset {
        border: 1px solid $blue;
        padding: 15px;
        border-radius: 6px;
          background: $blue;
          box-shadow: 0px 2px 10px rgba(0,0,0,0.3);
        legend {
            margin: 0 auto;
            padding: 2px 10px 0px;
            text-align: center;
            font-size: 16px;
            letter-spacing: 0.1em;
            font-weight: 500;
            color: $blue;
            border-radius: 3px;
            background-color: #fff;
            border: thin solid $blue2;
        }
        #card-element, input {
          background: #ffffff;
          padding: 10px 12px;
          border-radius: 3px;
          border: thin solid $blue2;
        }
    }
    .PaymentRequestButton--dark {
        background: $blue;

    }
    .PaymentRequestButton-content {
        .PaymentRequestButton-label {
            text-transform: uppercase;
        }
    }
}
</style>
