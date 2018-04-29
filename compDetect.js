// Beatriz Manrique
// CSE 3353
// Project 3: Images and Process Scheduling

'use  strict';

var Jimp = require("jimp"); // read in jimp

// load chance
var Chance = require('chance');

// instantiate chance
var chance = new Chance();

// detects foreground and background of an image
// foreground is assigned a white color
// background is assigned a black color
// fileTypes supported include .jpg .png .bmp
// scans image and reads Red, Green, and Blue values of each pixel
// averages out the read values and reassigns each RGB to the averaged value
// returns white or black for the pixel if greater than or less than 168
function compDetect (imageName, fileType){
    Jimp.read(imageName+"."+fileType).then(function(image){
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, index){
            var red = image.bitmap.data[index+0]
            var green = image.bitmap.data[index+1] 
            var blue = image.bitmap.data[index+2] 
            var hue = (red + green + blue)/3;
            
            // foreground
            // white
            if (hue > 168){
                image.bitmap.data[index+0] = 255;
                image.bitmap.data[index+1] = 255;
                image.bitmap.data[index+2] = 255;
            }
            // background 
            // black
            else{
                image.bitmap.data[index+0] = 0;
                image.bitmap.data[index+1] = 0;
                image.bitmap.data[index+2] = 0;
            }
           
            var alpha = this.bitmap.data[index+3];
        })
        return image.write("imageGroundDetect."+fileType); // save
    }).catch(function (err) {
        console.error(err);
// reads imageGroundDetect file from the previous output
// traverses image and determines connected pixels
// scans image and reads Red, Green, and Blue values of each pixel
// new color assignment is random using chance
// returns image with distinct paths in different colors
// result found in imageCompDetect
    }).then(Jimp.read("imageGroundDetect.png").then(function(image){
        var x = image.bitmap.width;
        var y = image.bitmap.height;
        var red = 0;
        var blue = 0;
        var green = 0;

        var modPix = [];
        for(var i=0; i<y; i++){
            for(var j=0; j<x; j++){
                var indexTopCenter = image.getPixelIndex(j, i-1);
                var indexLeft = image.getPixelIndex(j-1, i);
                var index = image.getPixelIndex(j,i);
                
                // if current pixel is white
                if ((image.bitmap.data[index+0] === 255) && (image.bitmap.data[index+1] === 255) && (image.bitmap.data[index+2] === 255)){
                    // if first pixel
                    if (j === 0 && i === 0){
                        red = chance.integer({ min: 1, max: 254 });
                        blue = chance.integer({ min: 1, max: 254 });
                        green = chance.integer({ min: 1, max: 254 });

                        image.bitmap.data[index+0] = red;
                        image.bitmap.data[index+1] = green;
                        image.bitmap.data[index+2] = blue;
                    }
                    else if (j != 0 && i === 0){
                        if ((image.bitmap.data[indexLeft+0] != 0) && (image.bitmap.data[indexLeft+1] != 0) && (image.bitmap.data[indexLeft+2] != 0)){
                            image.bitmap.data[index+0] = image.bitmap.data[indexLeft+0];
                            image.bitmap.data[index+1] = image.bitmap.data[indexLeft+1];
                            image.bitmap.data[index+2] = image.bitmap.data[indexLeft+2];
                        }
                        else {
                            red = chance.integer({ min: 1, max: 254 });
                            blue = chance.integer({ min: 1, max: 254 });
                            green = chance.integer({ min: 1, max: 254 });

                            image.bitmap.data[index+0] = red;
                            image.bitmap.data[index+1] = green;
                            image.bitmap.data[index+2] = blue;
                        }
                    }
                    else if (j === 0 && i != 0){
                        if ((image.bitmap.data[indexTopCenter+0] != 0) && (image.bitmap.data[indexTopCenter+1] != 0) && (image.bitmap.data[indexTopCenter+2] != 0)){
                            image.bitmap.data[index+0] = image.bitmap.data[indexTopCenter+0];
                            image.bitmap.data[index+1] = image.bitmap.data[indexTopCenter+1];
                            image.bitmap.data[index+2] = image.bitmap.data[indexTopCenter+2];
                        }
                        else {
                            red = chance.integer({ min: 1, max: 254 });
                            blue = chance.integer({ min: 1, max: 254 });
                            green = chance.integer({ min: 1, max: 254 });

                            image.bitmap.data[index+0] = red;
                            image.bitmap.data[index+1] = green;
                            image.bitmap.data[index+2] = blue;
                        }
                    }
                    
                    // if left is not black
                    else if (((image.bitmap.data[indexLeft+0] != 0) && (image.bitmap.data[indexLeft+1] != 0) && (image.bitmap.data[indexLeft+2] != 0))){
                        red = image.bitmap.data[indexLeft+0];
                        green = image.bitmap.data[indexLeft+1];
                        blue = image.bitmap.data[indexLeft+2];
                        
                        image.bitmap.data[index+0] = red;
                        image.bitmap.data[index+1] = green;
                        image.bitmap.data[index+2] = blue;
                    }
                    // if top is not black
                    else if (((image.bitmap.data[indexTopCenter] != 0) && (image.bitmap.data[indexTopCenter+1] != 0) && (image.bitmap.data[indexTopCenter+2] != 0))){
                        red = image.bitmap.data[indexTopCenter+0];
                        green = image.bitmap.data[indexTopCenter+1];
                        blue = image.bitmap.data[indexTopCenter+2];
                        
                        image.bitmap.data[index+0] = red;
                        image.bitmap.data[index+1] = green;
                        image.bitmap.data[index+2] = blue;
                    }
                    //else new line
                    else {
                        red = chance.integer({ min: 1, max: 254 });
                        green = chance.integer({ min: 1, max: 254 });
                        blue = chance.integer({ min: 1, max: 254 });

                        image.bitmap.data[index+0] = red;
                        image.bitmap.data[index+1] = green;
                        image.bitmap.data[index+2] = blue;

                        for (var k = 1; k < 6; k++){
                            var indexFarTopRight = image.getPixelIndex(j+k, i-1)
                            if (((image.bitmap.data[indexFarTopRight+0] != 0) && (image.bitmap.data[indexFarTopRight+1] != 0) && (image.bitmap.data[indexFarTopRight+2] != 0)) && ((image.bitmap.data[indexFarTopRight+0] != image.bitmap.data[index]) && (image.bitmap.data[indexFarTopRight+1] != image.bitmap.data[index]) && (image.bitmap.data[indexFarTopRight+2] != image.bitmap.data[index]))){
                                if (j <= x - k){
                                    red = image.bitmap.data[indexFarTopRight+0];
                                    green = image.bitmap.data[indexFarTopRight+1];
                                    blue = image.bitmap.data[indexFarTopRight+2];
                                    
                                    image.bitmap.data[index+0] = red;
                                    image.bitmap.data[index+1] = green;
                                    image.bitmap.data[index+2] = blue;
                                    break;
                                }
                            }
                        }
                    }
                    
                }
                // else current pixel is black and we dont change that
            }
        }
        return image.write("imageCompDetect.png"); // save
    }).catch(function (err) {
        console.error(err);
    }))
};

compDetect("shapes", "png");