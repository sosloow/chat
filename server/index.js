var path = require('path');
var express = require('express');
var compress = require('compression');

var app = express();
var http = require('http').Server(app);

app.set('port', process.env.CHAT_PORT || 3000);

app.use(compress());
app.use(express.static(path.join(__dirname, '../public')));

app.get('*', function(req, res){
  res.send(path.resolve(__dirname, '../public/index.html'));
});

http.listen(app.get('port'), function(){
  console.log('listening on localhost:' + app.get('port'));
});
