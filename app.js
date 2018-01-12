var express = require('express');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb( null, Date.now() + '-' + file.originalname);
  }
});

var upload = multer({storage: storage});

var app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// It's very crucial that the file name matches the name attribute in your html
app.post('/', upload.single('imageupload'),function(req, res){
  var files = req.file;
  res.end(
    `<p>${JSON.stringify(files)}</p>
    <a href="/">Go Back</a>
    `
  );
});

app.listen(5000);
