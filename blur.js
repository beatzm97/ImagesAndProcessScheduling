// Beatriz Manrique
// CSE 3353
// Project 3: Images and Process Scheduling

'use  strict';

var Jimp = require("jimp"); // read in jimp

// USE GET PIXEL COLOR


// blur input image
// fileTypes supported include .jpg .png .bmp
// scans image and reads Red, Green, Blue, and Alpha values of each pixel
// Kernel is a 3x3 matrix shown as a 1D array
// the target pixel is in the center of the kernel
// end value for target pixel is the sum of the 3x3 area around and including the pixel multiplied by the 3x3 kernel
// returns blurred image as a new image called imageBlur with matching filetype as input
function blur(imageName, fileType){
    Jimp.read(imageName+"."+fileType).then(function(image){
        var x = image.bitmap.width;
        var y = image.bitmap.height;
        var kernel = [.0625,.125,.0625,.125,.25,.125,.0625,.125,.0625];
        // Blur
        for(var i=1; i<y; i++){
            for(var j=1; j<x; j++){
                var indexTopLeft = image.getPixelIndex(j-1, i+1);
                var indexTopCenter = image.getPixelIndex(j, i+1);
                var indexTopRight = image.getPixelIndex(j+1, i+1);
                var indexLeft = image.getPixelIndex(j-1, i);
                var indexCenter = image.getPixelIndex(j,i);
                var indexRight = image.getPixelIndex(j+1, i);
                var indexBottomLeft = image.getPixelIndex(j-1, i-1);
                var indexBottomCenter = image.getPixelIndex(j, i-1);
                var indexBottomRight = image.getPixelIndex(j+1, i-1);

                // scale red
                var red = ((image.bitmap.data[indexTopLeft+0] * kernel[0]) + (image.bitmap.data[indexTopCenter+0] * kernel[1]) + (image.bitmap.data[indexTopRight+0] * kernel[2]) + (image.bitmap.data[indexLeft+0] * kernel[3]) + (image.bitmap.data[indexCenter+0] * kernel[4]) + (image.bitmap.data[indexRight+0] * kernel[5]) + (image.bitmap.data[indexBottomLeft+0] * kernel[6]) + (image.bitmap.data[indexBottomCenter+0] * kernel[7]) + (image.bitmap.data[indexBottomRight+0] * kernel[8])); 
                image.bitmap.data[indexCenter+0] = red;
                
                // scale green
                var green = ((image.bitmap.data[indexTopLeft+1] * kernel[0]) + (image.bitmap.data[indexTopCenter+1] * kernel[1]) + (image.bitmap.data[indexTopRight+1] * kernel[2]) + (image.bitmap.data[indexLeft+1] * kernel[3]) + (image.bitmap.data[indexCenter+1] * kernel[4]) + (image.bitmap.data[indexRight+1] * kernel[5]) + (image.bitmap.data[indexBottomLeft+1] * kernel[6]) + (image.bitmap.data[indexBottomCenter+1] * kernel[7]) + (image.bitmap.data[indexBottomRight+1] * kernel[8])); 
                image.bitmap.data[indexCenter+1] = green;

                // scale blue
                var blue = ((image.bitmap.data[indexTopLeft+2] * kernel[0]) + (image.bitmap.data[indexTopCenter+2] * kernel[1]) + (image.bitmap.data[indexTopRight+2] * kernel[2]) + (image.bitmap.data[indexLeft+2] * kernel[3]) + (image.bitmap.data[indexCenter+2] * kernel[4]) + (image.bitmap.data[indexRight+2] * kernel[5]) + (image.bitmap.data[indexBottomLeft+2] * kernel[6]) + (image.bitmap.data[indexBottomCenter+2] * kernel[7]) + (image.bitmap.data[indexBottomRight+2] * kernel[8])); 
                image.bitmap.data[indexCenter+2] = blue; 
                
                 // scale alpha
                 var alpha = ((image.bitmap.data[indexTopLeft+3] * kernel[0]) + (image.bitmap.data[indexTopCenter+3] * kernel[1]) + (image.bitmap.data[indexTopRight+3] * kernel[2]) + (image.bitmap.data[indexLeft+3] * kernel[3]) + (image.bitmap.data[indexCenter+3] * kernel[4]) + (image.bitmap.data[indexRight+3] * kernel[5]) + (image.bitmap.data[indexBottomLeft+3] * kernel[6]) + (image.bitmap.data[indexBottomCenter+3] * kernel[7]) + (image.bitmap.data[indexBottomRight+3] * kernel[8])); 
                 image.bitmap.data[indexCenter+3] = alpha; 
            }
        }
    return image.write("imageBlur."+fileType);
    }).catch(function(err){
        console.error(err);
    })
};

blur("Leaf", "png");