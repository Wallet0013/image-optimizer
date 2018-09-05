<template>
  <div id="CroppImage">
    <div class="columns">
      <div class="column">
        <label class="label has-text-primary">Crop Size</label>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input is-primary is-rounded" type="text" placeholder="Height" v-model="cropbox.height" @change="setCropsize">
          </p>
          <label class="label has-text-grey has-text-centered" style="margin-top:8px;">×</label>
          <p class="control has-icons-left">
            <input class="input is-primary is-rounded" type="text" placeholder="Width" v-model="cropbox.width" @change="setCropsize">
          </p>
        </div>
        <!-- <label class="label has-text-primary">Image Size</label>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input is-primary is-rounded" type="text" placeholder="Height" v-model="image.height">
          </p>          
          <label class="label has-text-grey has-text-centered" style="margin-top:8px;">×</label>
          <p class="control has-icons-left">
            <input class="input is-primary is-rounded" type="text" placeholder="Width" v-model="image.width">
          </p> 
        </div> -->
        <label class="label has-text-danger"> danger </label>
        <button @click="resetData" class="button is-danger is-outlined is-fullwidth"> Reset Data</button>
      </div>
      <div class="column is-four-fifths">
        <label class="label has-text-info">Cropp Image</label>
        <figure class="image has-text-centered">
          <vue-cropper
            ref='cropper'
            :guides="true"
            :view-mode="0"
            drag-mode="crop"
            :auto-crop-area="1"
            :min-container-width="250"
            :min-container-height="180"
            :background="true"
            :rotatable="true"
            :autoCrop="true"
            :crop="cropImage"
            :src="imgSrc"
            alt="Select image at first"
            :img-style="{ 'width': '100%', 'height': '500px' }">
          </vue-cropper>
        </figure>
        <p class="has-text-centered" style="margin-top:10px;">
          <a class="button is-info" @click="rotateLeft" >
            <span class="icon is-small">
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNjQgNjQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDY0IDY0Ij48cGF0aCBmaWxsPSIjRkRGREZCIiBkPSJNLjYxNCAxNi4xOTNsLS4wMDItLjAwMi0uMDA2LS4wMWMtLjE3Mi0uMTk1LS4yOTgtLjQzLS4zOTktLjY3OGwtLjA3Ni0uMjI1Yy0uMDU4LS4xOTEtLjA5NC0uMzg5LS4xMDYtLjU5NmwtLjAxNi0uMjI2LS4wMDgtLjExNWMuMDE0LS4yMzkuMDYyLS40Ny4xMzYtLjY4N2wuMDMtLjA2NGMuMDg4LS4yMzkuMjE0LS40NTEuMzYzLS42NDVsLjA1LS4wOSAxMC4zMTEtMTIuMTQ2Yy43ODktLjkzIDIuMDg0LS45NDggMi44OTQtLjAzNy44MDguOTEuODIzIDIuNDAyLjAzMiAzLjMzNGwtNS41NTggNi41NDljOC4xMjEtMS4wNzYgMTYuMTA0LjYzMyAxNi40ODEuNzE3IDI0LjY0NiA0LjQ2NyA0Mi4wODcgMjcuMjI3IDM4Ljg4IDUwLjczNi0uMTU5IDEuMTY0LTEuMDI4IDEuOTkyLTIuMDE5IDEuOTkybC0uMzItLjAyN2MtMS4xMTYtLjIwMy0xLjg3OC0xLjQwOS0xLjcwNC0yLjY5NiAyLjg1Ny0yMC45NC0xMy4wNTYtNDEuMjgyLTM1LjUzNy00NS4zNTgtLjEwMy0uMDI0LTguMzUxLTEuNzk0LTE2LjExNy0uNTc0bDguNTc3IDUuMDkzYzEuMDA1LjU5OCAxLjM5OCAyLjAyLjg4MSAzLjE3Ny0uNTE2IDEuMTU5LTEuNzQ4IDEuNjA4LTIuNzU2IDEuMDE3bC0xMy41Mi04LjAyOGMtLjE4My0uMTExLS4zNDctLjI1LS40OTEtLjQxMXoiIGNsYXNzPSJhY3RpdmUtcGF0aCIvPjwvc3ZnPg==" />
            </span>
          </a>
          <a class="button is-info" @click="rotateRight" >
            <span class="icon is-small">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNjQgNjQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDY0IDY0Ij48cGF0aCBmaWxsPSIjRkRGREZCIiBkPSJNNjMuMzg2IDE2LjE5M2wuMDAyLS4wMDIuMDA2LS4wMWMuMTcyLS4xOTUuMjk4LS40My4zOTktLjY3OGwuMDc2LS4yMjVjLjA1OC0uMTkxLjA5NC0uMzg5LjEwNi0uNTk2bC4wMTYtLjIyNi4wMDgtLjExNWMtLjAxNC0uMjM5LS4wNjItLjQ3LS4xMzYtLjY4N2wtLjAzLS4wNjRjLS4wODgtLjIzOS0uMjE0LS40NTEtLjM2My0uNjQ1bC0uMDUtLjA5LTEwLjMxMS0xMi4xNDZjLS43ODktLjkzLTIuMDg0LS45NDgtMi44OTQtLjAzNy0uODA4LjkxLS44MjMgMi40MDItLjAzMiAzLjMzNGw1LjU1OCA2LjU0OWMtOC4xMjEtMS4wNzYtMTYuMTA0LjYzMy0xNi40ODEuNzE3LTI0LjY0NiA0LjQ2Ny00Mi4wODcgMjcuMjI3LTM4Ljg4IDUwLjczNi4xNTkgMS4xNjQgMS4wMjggMS45OTIgMi4wMTkgMS45OTJsLjMyLS4wMjdjMS4xMTYtLjIwMyAxLjg3OC0xLjQwOSAxLjcwNC0yLjY5Ni0yLjg1Ny0yMC45NCAxMy4wNTYtNDEuMjgyIDM1LjUzNy00NS4zNTguMTAzLS4wMjQgOC4zNTEtMS43OTQgMTYuMTE3LS41NzRsLTguNTc3IDUuMDkzYy0xLjAwNS41OTgtMS4zOTggMi4wMi0uODgxIDMuMTc3LjUxNiAxLjE1OSAxLjc0OCAxLjYwOCAyLjc1NiAxLjAxN2wxMy41Mi04LjAyOGMuMTgzLS4xMTEuMzQ3LS4yNS40OTEtLjQxMXoiIGNsYXNzPSJhY3RpdmUtcGF0aCIvPjwvc3ZnPg==" />
            </span>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropperjs';
  
  export default {
    components: {
      VueCropper,
    },
    data() {
      return {
        imgSrc: '',
        cropbox: {
          left : '',
          top: '',
          width: '',
          height: ''
        },
        image:{
          left: '',
          top: '',
          width: '',
          height: ''
        },
        canvasbox:{
          left: '',
          top: '',
          width: '',
          height: ''
        }
      };
    },
    methods: {
      // auto function
      // send DataURL to parent compornent
      cropImage() {
        this.cropbox.height = this.$refs.cropper.getCroppedCanvas().height,
        this.cropbox.width = this.$refs.cropper.getCroppedCanvas().width,
        this.image.height = this.$refs.cropper.getImageData().height,
        this.image.width = this.$refs.cropper.getImageData().width,
        this.$emit('childs-event',this.$refs.cropper.getCroppedCanvas().toDataURL()) 
      },
      setCropsize(){
        this.$refs.cropper.setCropBoxData({
          height:this.cropbox.height ,
          width:this.cropbox.height 
        })
      },
      resetData(){
        try{
          this.$refs.cropper.reset()
        } catch (TypeError) {}
      },
      rotateRight() {
        try{
          this.$refs.cropper.rotate(5);
        } catch (TypeError) {}
      },
      rotateLeft() {
        try{
          this.$refs.cropper.rotate(-5);
        } catch (TypeError) {}
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>