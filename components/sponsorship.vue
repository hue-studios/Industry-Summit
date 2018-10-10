<template>
<vk-grid id="checkout">
  <h2 class="uk-width-1-1 bold uk-text-lowercase">sponsorship</h2>
  <!-- <div class="uk-width-1-1">
    <img v-bind:src="imagePreview" v-show="showPreview" style="width: 50px; height:50px; border: thin solid black; visibility: visible !important"/>
  </div>
    <div class="uk-width-1-1">
       <div class="js-upload uk-placeholder uk-text-center">
    <span uk-icon="icon: cloud-upload"></span>
    <span class="uk-text-middle">DROP IMAGE HERE OR </span>
      <div uk-form-custom>
        <input type="file" id="file" ref="file" accept="image/*" v-on:change="validateFile()">
        <span class="uk-link">SELECT ONE</span>
      </div>
       </div>
      <progress id="js-progressbar" class="uk-progress" value="0" max="100" hidden></progress>
      <button @click="upload" class="uk-button uk-button-default">UPLOAD</button>

    </div> -->
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

      var files = document.getElementById('file').files;
      if (files.length > 0) {

        this.getBase64(files[0].name, files[0]);

      }
    },
    getBase64(name, file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
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
          console.log(response)
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
