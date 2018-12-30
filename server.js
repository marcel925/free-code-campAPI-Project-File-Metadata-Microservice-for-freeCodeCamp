'use strict';

var express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser");
var multer = require("multer");

//var upload = multer({ dest: 'assets/' });

// require and use "multer"...
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(multer);



app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  
  console.log(req.file);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.send({file_name: req.file.originalname, file_size: req.file.size});
})
 




app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
