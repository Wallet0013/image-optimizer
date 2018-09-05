import Vue from "vue";
import Cropper from './Cropper.vue'
import ImageCompressor from 'image-compressor.js';
import filesize from 'filesize';


const convertSize = 1000;


const SelectImage = new Vue({
    el: '#SelectImage',
    data: {
        selected: false,
        file: '',
        // file object
        rawfile: '',
    },
    methods: {
        // call only at first 
        setImage(e) {
            this.rawfile = e.target.files[0];
            this.file = e.target.files[0];

            // set data type and size
            CroppedImage.$data.beforeSize = filesize(this.file.size);
            CroppedImage.$data.beforeType = this.file.type;

            if (!this.file.type.includes('image/')) {
                alert('Please select an image file');
                return;
            }

            if (typeof FileReader === 'function') {
                // get raw data
                const rawreader = new FileReader();
                rawreader.onload = (event) => {
                    // set raw file (base64)
                    CroppedImage.$data.rawImg = event.target.result;
                    
                };
                rawreader.readAsDataURL(this.rawfile);

                new ImageCompressor(this.file, {
                    quality: toolBox.$data.quality,
                    convertSize: convertSize,
                    success(result) {
                        SelectImage.$data.file = result;
                        const reader = new FileReader();

                        reader.onload = (event) => {
                            CroppImage.$children[0].$data.imgSrc = event.target.result;
                            CroppImage.$children[0].$refs.cropper.replace(event.target.result);
                        };
                        reader.readAsDataURL(SelectImage.$data.file);
                        SelectImage.showObj();
                    },
                    error(e) {
                      console.log("error:",e.message);
                    },
                });
            } else {
                alert('Sorry, FileReader API not supported');
            }
        },
        changeQuality(e){
            new ImageCompressor(e, {
                quality: toolBox.$data.quality, 
                convertSize: convertSize,
                success(result) {
                    SelectImage.$data.file = result;
                    const reader = new FileReader();

                    reader.onload = (event) => {
                        CroppImage.$children[0].$data.imgSrc = event.target.result;
                        CroppImage.$children[0].$refs.cropper.replace(event.target.result);
                    };
                    reader.readAsDataURL(SelectImage.$data.file);
                },
                error(e) {
                  console.log("error:",e.message);
                },
            });
        },
        showObj(e){
            toolBox.$data.selected = true;
            CroppImage.$data.selected = true;
            CroppedImage.$data.selected = true;
        }
    }
});

const CroppImage = new Vue({
    el: '#CroppImage',
    data: {
        selected: false,
    },
    methods:{
        setImage(d) {
            // set base64 and DataURL
            CroppedImage.$data.cropImg = d;
        }
    },
    components: {
        Cropper
    },
    template: '<Cropper v-if="selected"  @childs-event="setImage" />'
})

const toolBox = new Vue({
    el: '#toolBox',
    data: {
        selected: false,
        quality: 0.8
    },
    methods:{
        setQuality(q) {
            // set compression quality
            this.quality = q;
            // send cropping data
            console.log(CroppImage.$children[0].$refs.cropper)
            // SelectImage.changeQuality(CroppImage.$children[0].$refs.cropper.getCroppedCanvas().toDataURL());
            
        }
    }
})

const CroppedImage = new Vue({
    el: '#CroppedImage',
    data: {
        // set raw img data that have base64 and DataURL
        cropImg: '',
        // set raw img data that have base64 and DataURL
        rawImg:'',
        CompresscropImg:'',
        selected: false,
        beforeSize:'',
        beforeType:'',
        afterSize:'',
        afterType:''
    }
})