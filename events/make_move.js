// ON make move
// The player should get which game id and round number
// it should do a get to get the current cards in the round
// then should also do get for the valid cards
// should then post the card
//
var make_move = function(io, socketid, gameId, round_number){
    var ner =  {
        gameId: gameId,
        round_number: round_number,
        socket_id: socketid
    }
    io.in(socketid).emit('make_move', 'the_fuck')
    console.log("make move done", socketid)
}

module.exports = make_move;
