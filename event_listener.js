var make_move = require('./events/make_move'),
    start_round = require('./events/start_round');

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

    socket.on('got_round_winner', function(game_id){
        Game.findById(game_id, function(err,game){
            if (err)
                "Fuck"
            else{
                if (game.currentRound != 14){
                    if (game.got_round_winner  == 3){
                        start_round(io, game_id)
                        game.got_round_winner = 0
                        game.save()
                    }
                    else{
                        game.got_round_winner += 1
                        game.save()
                    }
                }
                else{
                    socket.emit('get_final_score');
                }
            }
        })
    })
});
    
}

module.exports = EventSynchronizer;
