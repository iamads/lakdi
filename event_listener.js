
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

	socket.on('join_game', function(game_id){
		socket.join(game_id);
		io.emit('Created game', "Joined" +  game_id);
	})

    socket.on('disabled', function(msg){
        console.log('make_mve -> your move : ' + msg),
        msg = JSON.parse(msg)
        socket.broadcast.to(msg['socket_id']).emit('your_move', msg)        
    })
});
    
}

module.exports = EventSynchronizer;
