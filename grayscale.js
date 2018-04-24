var Jimp = require("jimp");

Jimp.read("Kaneki.jpg").then(function(Kaneki){
    Kaneki.scan(0, 0, Kaneki.bitmap.width, Kaneki.bitmap.height, function(x, y, index){
        this.bitmap.data[index+0] = this.bitmap.data[index+0] * 0.3;
        this.bitmap.data[index+1] = this.bitmap.data[index+1] * 0.59;
        this.bitmap.data[ index + 2 ] = this.bitmap.data[index+2] * 0.11;
        var alpha = this.bitmap.data[ index + 3 ];
    })
}).then(Jimp.read("Kaneki.jpg").then(function(Kaneki){
    return Kaneki.resize(480, 270)     // resize
    .quality(90)                 // set JPEG quality
    .write("KanekiRun.jpg"); // save
})).catch(function (err) {
    console.error(err);
})