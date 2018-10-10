<template>
<div class="uk-offcanvas-content">
  <vk-grid class="uk-child-width-1-1">
    <div id="header">
      <vk-sticky show-on-up animation="slide-top" bottom="#bottom">
        <vk-navbar>
          <div v-if="this.$auth.loggedIn" class="uk-margin-left">
            <nuxt-link to="/account/">
              <img class="uk-border-circle" :src="'https://ui-avatars.com/api/?name=' + this.$auth.user.first_name + '+' + this.$auth.user.last_name" style="width: 30px; height: 30px;">
            </nuxt-link>
            <button @click.prevent="logoutUser()" class="uk-button uk-button-default title-bold" id="logoutBtn">LOGOUT</button>
          </div>

          <vk-navbar-nav class="uk-visible@m" slot="center-left">
            <li>
              <nuxt-link to="/economic-development-industry-conference/">
                ABOUT
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/sponsorship/">
                SPONSORSHIP
              </nuxt-link>
            </li>
          </vk-navbar-nav>
          <vk-navbar-logo slot="center">
            <nuxt-link to="/">
              <logo></logo>
            </nuxt-link>
          </vk-navbar-logo>
          <vk-navbar-nav class="uk-visible@m" slot="center-right">
            <li>
              <nuxt-link to="/registration/register/">
                REGISTER
              </nuxt-link>
            </li>
            <li v-if="this.$auth.loggedIn">
              <nuxt-link to="/account/">
                ACCOUNT
              </nuxt-link>
            </li>
            <li v-else>
              <nuxt-link to="/account/login/">
                LOGIN
              </nuxt-link>
            </li>
          </vk-navbar-nav>



          <div id="menu-icon" uk-toggle="target: #offcanvas-menu" class="uk-hidden@m">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 12.5">
              <defs>
                <style>
                  .cls-1 {
                    fill: none;
                    stroke: #243457;
                    stroke-miterlimit: 10;
                  }
                </style>
              </defs>
              <title>menu-btn</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1-2">
                  <line class="cls-1" y1="0.5" x2="52" y2="0.5" />
                  <line class="cls-1" y1="12" x2="52" y2="12" />
                </g>
              </g>
            </svg>
          </div>
        </vk-navbar>

      </vk-sticky>
    </div>
  </vk-grid>
  <nuxt />
  <pageFooter />
  <transition name="fade">
    <div id="loading" v-if="$store.state.loading.status" class="uk-flex uk-flex-center uk-flex-middle uk-flex-column" v-vk-height-viewport>
      <vk-spinner ratio=1.5 class="white"></vk-spinner>
      <transition name="fade" mode="out-in">
        <h5 v-if="$store.state.loading.message" class="uk-text-uppercase uk-margin-remove-bottom white">{{$store.state.loading.message}}</h5>
      </transition>
    </div>
  </transition>
  <div id="offcanvas-menu" uk-offcanvas="overlay:true; mode:reveal">
    <div class="uk-offcanvas-bar uk-flex uk-flex-column">
      <ul class="uk-nav uk-nav-default uk-margin-auto-vertical">
        <li>
          <nuxt-link class="condensed white uk-offcanvas-close uk-close" to="/">
            <vk-icon icon="home" class="uk-margin-small-right"></vk-icon>HOME
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="condensed uk-offcanvas-close uk-close" to="/economic-development-industry-conference/">
            <vk-icon icon="info" class="uk-margin-small-right"></vk-icon>ABOUT
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="condensed white uk-offcanvas-close uk-close" to="/sponsorship/">
            <vk-icon icon="grid" class="uk-margin-small-right"></vk-icon>SPONSORSHIP
          </nuxt-link>
        </li>
        <li class="">
          <nuxt-link class="condensed white uk-offcanvas-close uk-close" to="/registration/register/">
            <vk-icon icon="file-edit" class="uk-margin-small-right"></vk-icon>REGISTER
          </nuxt-link>
        </li>
        <li class="uk-margin-large-bottom" v-if="this.$auth.loggedIn">
          <nuxt-link class="condensed white uk-offcanvas-close uk-close" to="/account/">
            <vk-icon icon="user" class="uk-margin-small-right"></vk-icon>ACCOUNT
          </nuxt-link>
        </li>
        <vk-nav-item-divider></vk-nav-item-divider>
        <p class="uk-margin-large-top uk-margin-remove-bottom"><a href="tel:607-724-1327" class="condensed uk-text-uppercase white">
            <vk-icon icon="receiver"></vk-icon> 607-724-1327
          </a></p>
        <p class="uk-margin-small uk-margin-large-bottom"><a href="mailto:contact@southerntier8.org" class="condensed uk-text-uppercase white">
            <vk-icon icon="mail"></vk-icon> contact@southerntier8.org
          </a></p>
        <vk-nav-item-divider></vk-nav-item-divider>
        <vk-grid class="uk-flex uk-flex-center">
          <div v-if="$auth.loggedIn" class="uk-width-1-1 uk-flex uk-flex-center uk-flex-column uk-margin-large-top">


            <img :src="'https://ui-avatars.com/api/?name=' + this.$auth.user.first_name + '+' + this.$auth.user.last_name" class="uk-border-circle" style="width:50px; height: 50px;">

            <button @click.prevent="logoutUser()" class="uk-button uk-button-default blue title-bold uk-close" id="logoutBtn">LOGOUT</button>


          </div>

          <div v-else>
            <nuxt-link to="/account/login/" class="uk-offcanvas-close uk-close title-bold uk-button uk-button-default blue" id="loginBtn">LOGIN</nuxt-link>
          </div>

        </vk-grid>

      </ul>
    </div>
  </div>
</div>
</template>
<script>
import logo from "~/components/logo.vue"
import pageFooter from "~/components/pageFooter.vue"
export default {
  data() {
    return {
      show: false
    }
  },
  components: {
    logo,
    pageFooter
  },
  mounted() {
    console.log(this.$auth.loggedIn)

      this.$auth.logout();
      localStorage.clear();
      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }

  },
  methods: {
    logoutUser() {
      this.$auth.logout();
      localStorage.clear();
      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      this.$router.push('/')

    }
  }
}
</script>
