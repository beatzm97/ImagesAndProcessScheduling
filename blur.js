// Beatriz Manrique
// CSE 3353
// Project 3: Images and Process Scheduling

'use  strict';

var Jimp = require("jimp"); // read in jimp

// blur input image
// fileTypes supported include .jpg .png .bmp
// scans image and reads Red, Green, and Blue values of each pixel
// each pixel undergoes horizontal blur with 1D kernel
// each pixel then undergoes vertical blur with 1D kernel
// returns blurred image as a new image called imageBlur with matching filetype and input
function grayScale (imageName, fileType){
    Jimp.read(imageName+"."+fileType).then(function(image){
        image.convolute([
            [0.039206,0.039798,0.039997,0.039798,0.039206],
            [0.039798,0.040399,0.040601,0.040399,0.039798],
            [0.039997,0.040601,0.040804,0.040601,0.039997],
            [0.039798,0.040399,0.040601,0.040399,0.039798],
            [0.039206,0.039798,0.039997,0.039798,0.039206],
        ])
        return image.write("imageBlur."+fileType); // save
    }).catch(function (err) {
        console.error(err);
    })
};

grayScale("SunsetMountain", "png");