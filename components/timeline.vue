<template>
<div id="timeline" class="uk-flex uk-flex-center uk-flex-middle uk-flex-column">
  <ol :class="progress">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ol>
</div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  computed: {
    progress: function () {
      return this.numberToWord(this.$store.state.panel);
    }
  },
  methods: {
    numberToWord(num) {
      var word;
      if (num == 0) {
        word = "zero";
      } else if (num == 1) {
        word = "one";
      } else if (num == 2) {
        word = "two";
      } else if (num == 3) {
        word = "three";
      } else if (num == 4) {
        word = "four";
      } else if (num == 5) {
        word = "five";
      } else if (num == 6) {
        word = "six";
      } else if (num == 7) {
        word = "seven";
      } else if (num == 8) {
        word = "eight";
      }
      return word;
    }
  }
}
</script>

<style scoped>

</style>
