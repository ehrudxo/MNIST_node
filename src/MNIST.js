const fs = require('fs')
  , Canvas = require('canvas')
  , Image = Canvas.Image
  ,canvas = new Canvas(28, 28)
  ,ctx = canvas.getContext('2d');
let images     = [];

//http://stackoverflow.com/questions/25024179/reading-mnist-dataset-with-javascript-node-js
// x,y 가 바뀌어 있어서 변경
function parse(imageSize =10){
  const dataFileBuffer  = fs.readFileSync(__dirname + '/../MNIST_DATA/train-images-idx3-ubyte');
  const labelFileBuffer = fs.readFileSync(__dirname + '/../MNIST_DATA/train-labels-idx1-ubyte');

  for (let image = 0; image < imageSize; image++) {
      let pixels = [];

      for (let y = 0; y <= 27; y++) {
          for (let x = 0; x <= 27; x++) {
              pixels.push(dataFileBuffer[(image * 28 * 28) + (x + (y * 28)) + 15]);
          }
      }

      let imageData  = {};
      imageData[JSON.stringify(labelFileBuffer[image + 8])] = pixels;

      images.push(imageData);
  }
  return this;
}
//저장. _draw 함수를 호출
function save(){
  let lastIndex
  images.forEach((image,index)=>{
    _draw(image,index)
    lastIndex = index
  });
  return lastIndex + 1 ;
}
//canvas에 draw
function _draw(digits,index)
{
  for(let key of Object.keys(digits)){
    var out = fs.createWriteStream(__dirname + '/../output/'+index+'-'+key+'.png');
    let digit = digits[key];
    var imageData = ctx.getImageData(0,0,28,28);
    for (var i = 0; i < digit.length; i++)
    {
      imageData.data[i * 4] = digit[i] * 255;
      imageData.data[i * 4 + 1] = digit[i] * 255;
      imageData.data[i * 4 + 2] = digit[i] * 255;
      imageData.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(imageData,0,0);
    out.write(canvas.toBuffer());
  }
}
module.exports.parse = parse;
module.exports.save = save;
module.exports.images = images;

// var draw =
