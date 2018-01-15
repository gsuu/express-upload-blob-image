var express = require("express");
var path = require('path');
var formidable = require("formidable");
var fs = require("fs");
var url = require("url");
var app = express();

function fullUrl(req) {
  var url2 = url.format({
    protocol: req.protocol,
    host: req.get('host')
    //pathname: req.originalUrl
  });
 return url2 + '/files/'
}
app.use('/', express.static(__dirname + '/'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/imgUpload", function(req, res) {
  var form = new formidable.IncomingForm();
  var result;

  form.multiples = true;

  form.uploadDir = path.join(__dirname, "files");

  form.on("file", function(field, file) {
    // res.json(file);
    fs.rename(file.path, path.join(form.uploadDir, file.name));
    result = {
      filename: file.name,
      url: fullUrl(req) + file.name
    };
  });

  form.on("error", function(err) {
    console.log("An error has occured: \n" + err);
  });

  form.on("end", function() {
    res.json(result);
  });

  form.parse(req);
});

app.post("/blobUpload", function(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, "blobFiles");
  form.keepExtensions = true;

  form.on("error", function(err) {
    console.log("An error has occured: \n" + err);
  });

  form.parse(req);
});

app.listen(5000);
