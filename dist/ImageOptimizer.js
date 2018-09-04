import Vue from "vue";
import Cropper from './Cropper.vue'


let soureIMG = '';




const SelectImage = new Vue({
    el: '#SelectImage',
    data: {
        selected: false
    },
    methods: {
        setImage(e) {
            const file = e.target.files[0];

            if (!file.type.includes('image/')) {
                alert('Please select an image file');
                return;
            }

            if (typeof FileReader === 'function') {
                const reader = new FileReader();

                reader.onload = (event) => {
                    CroppImage.$children[0].$data.imgSrc = event.target.result;
                    // rebuild cropperjs with the updated source
                    CroppImage.$children[0].$refs.cropper.replace(event.target.result);
                };

                reader.readAsDataURL(file);
                this.showObj();
            } else {
                alert('Sorry, FileReader API not supported');
            }
        },
        showObj(e){
            toolBox.$data.selected = true;
            CroppImage.$data.selected = true;
            CroppedImage.$data.selected = true;
        }
    }
});

const toolBox = new Vue({
    el: '#toolBox',
    data: {
        selected: false
    },
    methods:{

    }
});

const CroppImage = new Vue({
    el: '#CroppImage',
    data: {
        text: 'data',
        selected: false
    },
    methods:{
        setImage(d) {
            CroppedImage.$data.cropImg = d;
        }
    },
    components: {
        Cropper
    },
    template: '<Cropper v-if="selected"  @childs-event="setImage" />'
})

const CroppedImage = new Vue({
    el: '#CroppedImage',
    data: {
        cropImg: '',
        selected: false
    }
})