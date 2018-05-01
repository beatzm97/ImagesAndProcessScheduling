// Beatriz Manrique
// CSE 3353
// Project 3: Images and Process Scheduling

'use  strict';

var Jimp = require("jimp"); // read in jimp

// grayscales input image
// fileTypes supported include .jpg .png .bmp
// scans image and reads Red, Green, and Blue values of each pixel
// averages out the read values and reassigns each RGB to the averaged value
// returns grayscaled image as a new image called imageGray with matching filetype and input
function grayScale (imageName, fileType){
    Jimp.read(imageName+"."+fileType).then(function(image){
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, index){
            var red = this.bitmap.data[index+0]
            var green = this.bitmap.data[index+1] 
            var blue = this.bitmap.data[index+2] 
            var gray = (red + green + blue)/3;
            this.bitmap.data[index+0] = gray;
            this.bitmap.data[index+1] = gray;
            this.bitmap.data[index+2] = gray;
            var alpha = this.bitmap.data[index+3];
        })
        return image.write("imageGray."+fileType); // save
    }).catch(function (err) {
        console.error(err);
    })
};

// first input is the image name
// second input is the file type
    // types supported are png, jpg, and bmp
grayScale("shapes", "png");