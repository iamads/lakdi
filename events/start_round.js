var make_move = require('./make_move')
var Game = require('../models/gameModel')

var start_round = function(io, gameId){
    Game.findById(gameId, function(err, game){
        if (err)
            return "Shit"
        else{
            make_move(io, game.playerId[game.playerSequence[0]], gameId, game.currentRound);
                        // Socket Id of first player in sequence
        }
});
}

module.exports = start_round;
