# img-convert
========
Crossplatform converter for images. Requires [ImageMagick](https://www.imagemagick.org/script/download.php) installed.

Install
--------
`npm install img-convert --save`

Syntax
--------
`require('img-convert')(imgPath, targetPath[, params])`

`imgPath`  <string>  path to image file for conversion

`targetPath`  <string>  path to converted image file

`params`  <object>  contains [execution parameters](https://www.imagemagick.org/script/convert.php)

Returns `Promise` which fulfills to `targetPath`.

Optionally you can specify the path for ImageMagick binary:
`require('img-convert').path = "path/to/converter"`

Usage
--------
```javascript
const imgConvert = require('img-convert')
imgConvert('/mnt/d/picture.png', '/mnt/d/thumbs/small_picture.gif', { resample: 96, resize: '50%' })
	.then(targetPath => {
		console.log(targetPath)  // '/mnt/d/thumbs/small_picture.gif'
	})
	.catch(console.log.bind(console))
```
