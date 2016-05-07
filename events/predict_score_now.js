var predict_score_now = function(io, gameId){
    io.emit('predict_score_now', gameId)
}

module.exports = predict_score_now;
