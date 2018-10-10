<template>
<vk-grid id="upload" gutter="large" class="uk-flex uk-flex-center">
  <div class="uk-width-auto uk-text-center uk-margin-large-bottom">
    <form class="blueGradient">
      <vk-grid  gutter="small" class="">
        <div class="uk-width-1-1 uk-text-center">

        <img v-if="showPreview" v-bind:src="imagePreview" />
        <img v-else :class='{ showPreview }' />
      </div>
        <div class="uk-width-1-1 ">
          <div class="js-upload uk-placeholder uk-text-center">
            <vk-icon icon="cloud-upload"></vk-icon>
            <span class="uk-text-middle title-bold"> DROP IMAGE HERE OR </span>
            <div uk-form-custom>
              <input type="file" id="file" ref="file" accept="image/*" v-on:change="validateFile()">
              <span class="uk-link title">SELECT ONE</span>
            </div>
          </div>

          <button @click.prevent="upload" class="uk-button uk-button-default condensed white">UPLOAD</button>

        </div>
      </vk-grid>
    </form>
  </div>
</vk-grid>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      file: '',
      showPreview: false,
      imagePreview: ''
    }
  },
  components: {

  },
  mounted() {

  },
  methods: {
    goBack() {
      this.$store.commit('changePanel', 'backward')
    },
    goForward() {
      this.$store.commit('changePanel', 'forward')
    },
    validateFile() {
      this.file = this.$refs.file.files[0];
      let reader = new FileReader();
      reader.addEventListener("load", function () {
        this.showPreview = true;
        this.imagePreview = reader.result;
      }.bind(this), false);
      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file);
        }
      }
    },
    upload() {
      this.$store.state.loading.status = true
      this.$store.state.loading.message = 'Checking File Type'
      var files = document.getElementById('file').files;
      if (files.length > 0) {
        this.validateFile();
        this.getBase64(files[0].name, files[0]);

      } else {
        this.$store.state.loading.message = 'No Image.'
        this.$store.state.loading.status = false

      }
    },
    getBase64(name, file) {
      var app = this
      var reader = new FileReader();
      reader.readAsDataURL(file);
      this.$store.state.loading.message = 'Uploading Your logo.'
      reader.onload = function () {
        this.logoThumbnail = reader.result.split(',')[1];
        console.log(name + this.logoThumbnail)
        axios({
          method: 'post',
          url: 'https://southerntiersummit.com/manage/api/1.1/files',
          headers: {
            'Authorization': 'Bearer cCvD7emgpu8RebERqC8voTjUP1xvyVdB'
          },
          data: {
            data: reader.result,
            name: name
          },

        }).then(function (response) {
          console.log(response.data.data)
          app.$store.commit('SET_SPONSORSHIP_LOGO', response.data.data.id)
          app.$store.commit('SET_SPONSORSHIP_IMAGE', response.data.data.name)
          app.$store.state.loading.message = ''
          app.$store.state.loading.status = false
          app.$store.commit('changePanel', 'forward')
        })
        // console.log(this.logoThumbnail)
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }
}
</script>
<style scoped lang="scss">

</style>
