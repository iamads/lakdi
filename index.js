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
//app.get('/', function(req, res){
//	res.sendfile(__dirname + '/index.html');
//});

var port = process.env.PORT || 3000
app.use(bodyParser.urlenccoded({extended: true}));
app.use(bodyParser.json());

gameRouter = require('./routes/gameRoutes')(Game);

app.use('/api/game',gameRouter);

app.get('/', function(req,res){
    res.send("Welcome to Lakdi");
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('create room',function(){
		var room = Math.random() * (999-100) + 100;
		socket.join(room)
		io.emit('Created room', "Created" + room);
	});

	socket.on('join room', function(room){
		socket.join(room);
		io.emit('Created room', "Joined" +  room);
	})
});

http.listen(port, function(){
	console.log("listening on *:" + port);
});
