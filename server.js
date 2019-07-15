'use strict';

var express = require('express');
var cors = require('cors');
var path = require('path');
// require and use "multer"...
var multer  = require('multer');

var app = express();
var port = process.env.PORT || 3000;


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Set storage engine
const multerConf = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, callback) {
      //console.log(file);
      callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})


// Initialise upload
const upload = multer({
  storage: multerConf
}).single('upfile');  

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });


app.post('/api/fileanalyse', function(req, res){
  //res.json({message: "Test file analyse"});
  upload(req, res, function(error) {
    if (error) {
      res.send("Error");
    } else {
      console.log(req.file);
      res.json({filename: req.file.filename, size: req.file.size});
    }
  });
  //res.send("success");
});

app.listen(port, function () {
  console.log(`Node.js listening on port ${port}`);
});