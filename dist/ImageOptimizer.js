import Vue from "vue";
// import VueCropper from 'vue-cropperjs';
import VueCropper from 'vue-cropperjs';


const SelectImage = new Vue({
    el: '#SelectImage',
    data: {
        text: 'data'
    },
    methods: {
        selectImage: function () {
            alert('tes')
        }
    }
});
