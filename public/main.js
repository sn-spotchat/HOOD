const express = require('express');
var path = require('path');
const app = express();
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'src')));//여기 부분 경로를 제대로 설정해주지 않았기에 오류가 있었다.
app.get('/', function(request, response) {
  fs.readFile(`main_page.html`, 'utf8', function(err, description){
    response.send(description);
  });
});

app.get('/views', function(request, response) {
  fs.readdir('/views', function(error, filelist){
      fs.readFile(`views/login.js`, 'utf8', function(err, description){
        response.end(description);
      });
    });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});
