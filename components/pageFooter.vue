<template>
<vk-grid id="footer" class="uk-flex uk-flex-center uk-margin-remove-top">
  <div class="uk-width-1-1 uk-width-1-3@s uk-text-center uk-margin-remove-top">
    <p class="uk-margin-remove">
      <nuxt-link to="/account/" class="condensed uk-text-uppercase white">ACCOUNT</nuxt-link>
    </p>
    <p v-if="this.$auth.loggedIn" class="uk-margin-remove"><a @click.prevent="clear()" class="condensed uk-text-uppercase white">LOGOUT</a></p>
    <p class="uk-margin-remove">
      <nuxt-link to="/terms/" class="condensed uk-text-uppercase white">TERMS OF USE</nuxt-link>
    </p>
    <p class="uk-margin-remove"><a @click.prevent="clear()" class="condensed uk-text-uppercase white">CLEAR COOKIES</a></p>

  </div>
  <div class="uk-width-1-1 uk-width-1-3@s uk-text-center uk-margin-remove-top">
    <p class="uk-margin-remove">
      <nuxt-link to="/registration/sponsor/" class="condensed uk-text-uppercase white">SPONSORSHIP</nuxt-link>
    </p>
    <p class="uk-margin-remove">
      <nuxt-link to="/registration/register/" class="condensed uk-text-uppercase white">REGISTER</nuxt-link>
    </p>
  </div>
  <div class="uk-width-1-1 uk-width-1-3@s uk-text-center uk-margin-remove-top">
    <p class="uk-margin-remove"><a href="tel:607-724-1327" class="condensed uk-text-uppercase white">
        607-724-1327
      </a></p>
    <p class="uk-margin-remove"><a href="mailto:contact@southerntier8.org" class="condensed uk-text-uppercase white">
        contact@southerntier8.org
      </a></p>
  </div>
  <div class="uk-width-1-1 uk-text-center ">

    <p class="uk-margin-medium-top condensed uk-text-uppercase white">&copy; Southern Tier 8 Regional Board</p>
  </div>
  <div class="uk-flex uk-flex-bottom">
    <a href="http://huestudios.com" target="_blank" id="web_designer" class="uk-width-auto">designed by <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.44 48.62" id="hue-logo">
			<title>hue Creative Marketing - Binghamton, NY</title>
			<path class="a" d="M347.41,282.12h6.28v19.35c2-3.5,6.14-5.48,10.77-5.48,3.5,0,8.52,1.25,10.44,5.28.66,1.32,1.12,2.91,1.12,7.73v20.74h-3.56c-5.61,0-2.78-19.62-2.78-19.62,0-3,0-9.38-7.13-9.38a8.57,8.57,0,0,0-7.79,4.43c-1.06,1.85-1.06,5-1.06,7v17.57h-6.28Z" transform="translate(-347.41 -282.12)"></path>
			<path class="a" d="M388.17,296.59v21.34c0,3.24.73,7.33,7.07,7.33,3.1,0,6-1.06,7.79-3.7,1.39-2,1.39-4.56,1.39-6.21,0,0-1.87-18.76,2.07-18.76h4.33v27c0,.66.13,4.36.2,6.21h-6.47l-.13-5.68c-1.19,2.31-3.44,6-10.57,6-8.19,0-12-4.69-12-11.23V296.59Z" transform="translate(-347.41 -282.12)"></path>
			<path class="a" d="M422,314.29c-.13,6.87,2.71,12,9.51,12,5.93,0,6.3-6.87,9.67-6.87h4.33a11.26,11.26,0,0,1-2.84,6.94c-1.45,1.65-4.76,4.43-11.43,4.43-10.44,0-15.39-6.47-15.39-17,0-6.54,1.32-12,6.54-15.59,3.17-2.25,7.13-2.44,9.05-2.44,14.86,0,14.53,13.15,14.4,18.56Zm17.51-4.36c.07-3.17-.53-9.78-8.19-9.78-4,0-8.92,2.44-9,9.78Z" transform="translate(-347.41 -282.12)"></path>
			</svg></a>
  </div>
</vk-grid>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  components: {

  },
  mounted() {

  },
  methods: {
    clear() {
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
<style scoped lang="scss">

</style>
