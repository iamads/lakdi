var make_move = require('./events/make_move')

var EventSynchronizer = function(sio, Game){
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

    socket.on('next_player', function(msg){
        console.log(msg['playerSocketId'] + ' ' + msg['game_id'])
        // If the index of player (from socketid) in playersequence is not three then send move to next player
        // else calculate winner
        Game.findById(msg['game_id'], function(err, game){
            if(err)
                "Game fucked"
            else{
                index = game.playerSequence.indexOf(game.get_player_from_socket_id(msg['playerSocketId']))
                console.log("index: "+ index, "player " + game.get_player_from_socket_id(msg['playerSocketId']))
                if (index == 3){
                    game.find_round_winner(msg['round_number'])
                    io.emit('find_round_winner', msg)
                }
                else{
                    make_move(io,game.playerId[game.playerSequence[index+1]], msg['game_id'],msg['round_number'])
                }
            }
        }) 
    })
});
    
}

module.exports = EventSynchronizer;
