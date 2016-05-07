
var EventSynchronizer = function(sio){
	var io=sio;
    // Listenig events 
    io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('create_game',function(game_id){
		socket.join(game_id)
		io.emit('Created game', "Created" + game_id);
	});

	socket.on('join_game', function(game){
		socket.join(game);
		io.emit('Created game', "Joined" +  game);
	})
});
    
}

module.exports = EventSynchronizer;
