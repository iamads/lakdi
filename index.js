var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('create room',function(){
		var room = Math.random() * (999-100) + 100;
		socket.join(room)
		io.emit('Created room', room);
	});

	socket.on('join room', function(room){
		socket.join(room);
		io.emit('Created room', room);
	})
});

http.listen(3000, function(){
	console.log("listening on *:3000");
});
