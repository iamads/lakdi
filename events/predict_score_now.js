var predict_score_now = function(io, gameId){       // Broadcasting here is incorrect, messages should only be sent to players of the game
    io.emit('predict_score_now', gameId)
}

module.exports = predict_score_now;
