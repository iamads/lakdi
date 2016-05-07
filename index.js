var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var db;
    if (process.env.ENV == 'Test')
        db = mongoose.connect('mongodb://localhost/lakdi_test');
    else
        db = mongoose.connect('mongodb://localhost/lakdi')

var Game = require('./models/gameModel');

var port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var event_listener = require('./event_listener')(io);

gameRouter = require('./routes/gameRoutes')(Game, io);

app.use('/api/game',gameRouter);

//app.get('/', function(req,res){
//    res.send("Welcome to Lakdi");
//});
app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});


http.listen(port, function(){
	console.log("listening on *:" + port);
});
