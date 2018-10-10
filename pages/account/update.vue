<template>
<vk-grid gutter="large" class="uk-flex uk-flex-center uk-flex-column uk-margin-remove-top">
  <div class="uk-width-1-1 uk-flex uk-flex-center uk-flex-column uk-margin-remove-top">

    <h1>UPDATE</h1>
    <div v-if="this.$auth.loggedIn">
    <p>{{this.$auth.user.given_name}}</p>
  </div>
  </div>

</vk-grid>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

export default {
  auth: false,
  data() {
    return {}
  },
  created() {
    var app = this
    console.log(this.$auth.loggedIn)
    console.log( this.$auth.strategy.name)
    if(this.$auth.strategy.name === 'local') {
      console.log("local strategy")
      this.$router.push('/account/')
    } else if(this.$auth.strategy.name === 'google') {
      axios.get('https://southerntiersummit.com/manage/api/1.1/tables/directus_users/rows/?filters[email][eq]=' + this.$auth.user.email).then((res) => {
        console.log("CHECKING FOR EMAIL IN DB: " + res)
        if (res.data.data.length > 0) {
          console.log("FOUND EMAIL AND LOGGIN IN WITH: " + app.$auth.user.email)
          app.$auth.loginWith('local', {
            data: {
              email: app.$auth.user.email,
              password: 'p195pr'
            }
          })
        } else if (res.data.data.length < 1){
          console.log("EMAIL " + app.$auth.user.email + " NOT FOUND - CREATING ACCOUNT.")
          console.log("NOW CREATING ACCOUNT WITH " + app.$auth.user.email)
          app.$axios({
            method: 'post',
            url: 'tables/directus_users/rows/',
            data: {
              first_name: app.$auth.user.given_name,
              last_name: app.$auth.user.family_name,
              email: app.$auth.user.email,
              avatar: app.$auth.user.picture,
              location: app.$auth.user.gender,
              password: 'p195pr'
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer cCvD7emgpu8RebERqC8voTjUP1xvyVdB'
            }
          }).then(response => {
            console.log(response)
          }).catch(error => {
            console.log(error)
          });
          // app.$auth.loginWith('local', {
          //   data: {
          //     email: app.$auth.user.email,
          //     password: 'p195pr'
          //   }
          // })
          // axios({
          //   method: 'post',
          //   url: 'https://southerntiersummit.com/manage/api/1.1/tables/directus_users/rows/',
          //   data: {
          //     first_name: app.$auth.user.given_name,
          //     last_name: app.$auth.user.family_name,
          //     email: app.$auth.user.email,
          //     avatar: app.$auth.user.picture,
          //     location: app.$auth.user.gender,
          //     password: 'p195pr'
          //   },
          //   headers: {
          //     'Authorization': 'Bearer cCvD7emgpu8RebERqC8voTjUP1xvyVdB'
          //   }
          // }).then(response => {
          //   if (response.status == 200) {
          //     // console.log("NOW LOGGING IN WITH " + app.$auth.user.email)
          //     // app.$auth.loginWith('local', {
          //     //   data: {
          //     //     email: app.$auth.user.email,
          //     //     password: 'p195pr'
          //     //   }
          //     // })
          //   }
          // }).catch(error => {
          //   console.log(error)
          // })

        }
    }).catch(error => {
      console.log(error)
    });
  }
  },
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
