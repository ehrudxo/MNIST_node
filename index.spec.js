const exImage = require('./ExtractAndImagify');
let imageSize = 100;//59999
let extracted = exImage.extract(imageSize);
exImage.save(extracted);
