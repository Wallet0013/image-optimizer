import Vue from "vue";
import Cropper from './Cropper.vue'


let soureIMG = '';


const SelectImage = new Vue({
    el: '#SelectImage',
    data: {
        text: 'data'
    },
    methods: {
      setImage(e) {
          const file = e.target.files[0];

          if (!file.type.includes('image/')) {
                alert('Please select an image file');
                return;
          }

          if (typeof FileReader === 'function') {
                console.log("called")
                const reader = new FileReader();

                reader.onload = (event) => {
                    CroppImage.$children[0].$data.imgSrc = event.target.result;
                    // rebuild cropperjs with the updated source
                    CroppImage.$children[0].$refs.cropper.replace(event.target.result);
                };

                reader.readAsDataURL(file);
          } else {
              alert('Sorry, FileReader API not supported');
          }
      }
    }
});

const CroppImage = new Vue({
    el: '#CroppImage',
    data: {
        text: 'data'
    },
    components: {
          Cropper
      },
    template: '<Cropper/>'
})