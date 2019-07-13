'use strict';

var express = require('express');
var cors = require('cors');
var path = require('path');
// require and use "multer"...
var multer  = require('multer');
const upload = multer();
var app = express();
var port = process.env.PORT || 3000;


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Set storage engine
const multerConf = {
  storage: multer.diskStorage({
    destination: function(req, file, next) {
      next(null, './public');
    },
    filename: function(req, file, callback) {
      console.log(file);
      callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
  })
}

// Initialise upload

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });


app.post('/api/fileanalyse', multer(multerConf).single('upfile'), function(req, res){
  //res.json({message: "Test file analyse"});
  res.send("test post route upload");
});

app.listen(port, function () {
  console.log(`Node.js listening on port ${port}`);
});
