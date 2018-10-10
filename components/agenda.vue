<template>

  <vk-grid id="agenda" class="uk-padding-large" gutter="large" v-vk-height-match="'.uk-card'">

    <div class="uk-width-1-1">
    <h2 uk-parallax="y: 150px;" class="green section-title">EVENT SESSIONS</h2>
  </div>
    <div class="uk-width-1-3@m session-card" v-for="session in sessions" :key="session.id">
      <vk-card >
        <h1>{{session.title}}</h1>
        <p>{{session.description}}</p>
      </vk-card>
    </div>

  </vk-grid>

</template>

<script>
export default {
  data() {
    return {
      sessions: []
    }
  },

  mounted() {
    this.$axios.$get('/tables/sessions/rows/').then((response) => {
      this.sessions = response.data
    })
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">

</style>
