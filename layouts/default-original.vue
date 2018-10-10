<template>
<div class="uk-offcanvas-content">
  <vk-grid class="uk-child-width-1-1">
    <div id="header">
      <vk-sticky show-on-up animation="slide-top" bottom="#bottom">
        <vk-navbar>
          <vk-navbar-nav class="uk-visible@m" slot="center-left">
            <!-- <li>
                <nuxt-link to="/economic-development-industry-conference">
                  NEXT SUMMIT
                </nuxt-link>
              </li> -->
            <li>
              <nuxt-link to="/economic-development-industry-conference">
                ABOUT
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
              <nuxt-link to="/sponsorship">
                SPONSORSHIP
              </nuxt-link>
            </li>
          </vk-navbar-nav>
          <nuxt-link id="register-btn" class="condensed-bold" to="/registration/register">
            REGISTER
          </nuxt-link>
          <div id="menu-icon" uk-toggle="target: #offcanvas-menu" class="uk-hidden@m">
          <vk-icon icon="menu" ratio="2"  ></vk-icon></div>
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
  <div id="offcanvas-menu" uk-offcanvas="overlay:true; mode:push">
    <div class="uk-offcanvas-bar uk-flex uk-flex-column">
      <ul class="uk-nav uk-nav-default uk-margin-auto-vertical">
        <li>
          <nuxt-link class="condensed white uk-offcanvas-close uk-close" to="/">
            <vk-icon icon="home" class="uk-margin-small-right"></vk-icon>HOME
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="condensed uk-offcanvas-close uk-close" to="/economic-development-industry-conference">
            <vk-icon icon="info" class="uk-margin-small-right"></vk-icon>ABOUT
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="condensed white uk-offcanvas-close uk-close" to="/sponsorship">
            <vk-icon icon="grid" class="uk-margin-small-right"></vk-icon>SPONSORSHIP
          </nuxt-link>
        </li>
        <li class="uk-margin-large-bottom">
          <nuxt-link class="condensed white uk-offcanvas-close uk-close" to="/registration/register">
            <vk-icon icon="file-edit" class="uk-margin-small-right"></vk-icon>REGISTER
          </nuxt-link>
        </li>
        <vk-nav-item-divider></vk-nav-item-divider>
        <p class="uk-margin-large-top uk-margin-remove-bottom"><a href="tel:607-724-1327" class="condensed uk-text-uppercase white"><vk-icon icon="receiver"></vk-icon>  607-724-1327</a></p>
        <p class="uk-margin-small"><a href="mailto:contact@southerntier8.org" class="condensed uk-text-uppercase white"><vk-icon icon="mail"></vk-icon> contact@southerntier8.org</a></p>
        <vk-nav-item-divider></vk-nav-item-divider>

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
  methods: {
  }
}
</script>
