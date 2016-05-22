var mongoose = require('mongoose'),
    find_winner = require('../utilities/find_winner')
    Schema = mongoose.Schema;
var _ = require('lodash');

var gameModel = new Schema({
    playerSequence:         {type: Array, default: ["playerOne","playerTwo","playerThree","playerFour"]},
    playerId:               {
                                playerOne:      { type: String },
                                playerTwo:      { type: String },
                                playerThree:    { type: String },
                                playerFour:     { type: String }
                            },
    playerCount:            { type: Number, default: 0 },
    playerType:             {
                                playerOne:          {type: Boolean, default: false},
                                playerTwo:          {type: Boolean, default: false},
                                playerThree:        {type: Boolean, default: false},
                                playerFour:         {type: Boolean, default: false}
                            },
    playerCards: {
        playerOne:          {type: Array},
        playerTwo:          {type: Array},
        playerThree:        {type: Array},
        playerFour:         {type: Array},
    },
    predictedScore: {
        playerOne:          {type: Number},
        playerTwo:          {type: Number},
        playerThree:        {type: Number},
        playerFour:         {type: Number}
    },
    currentScore: {
        playerOne:          {type: Number, default: 0},
        playerTwo:          {type: Number, default: 0},
        playerThree:        {type: Number, default: 0},
        playerFour:         {type: Number, default: 0}
    },
    currentRound:           {type: Number, default: 1 },
    trump:                  { type: String },
    rounds:                 {
                                1 : { playerOne: {type: String}, playerTwo: { type: String},
                                    playerThree: { type: String}, playerFour:{ type: String} },
                                2 : { playerOne: {type: String}, playerTwo: { type: String},
                                    playerThree: { type: String}, playerFour:{ type: String} },
                                3 : { playerOne: {type: String}, playerTwo: { type: String},
                                    playerThree: { type: String}, playerFour:{ type: String} },
                                4 : { playerOne: {type: String}, playerTwo: { type: String},
                                    playerThree: { type: String}, playerFour:{ type: String} },
                                5 : { playerOne: {type: String}, playerTwo: { type: String},
                                    playerThree: { type: String}, playerFour:{ type: String} },
                                6 : { playerOne: {type: String}, playerTwo: { type: String},
                                    playerThree: { type: String}, playerFour:{ type: String} },
                                7 : { playerOne: {type: String}, playerTwo: { type: String},
                                    playerThree: { type: String}, playerFour:{ type: String} },
                                8 : { playerOne: {type: String}, playerTwo: { type: String},
                                    playerThree: { type: String}, playerFour:{ type: String} },
                                9 : { playerOne: {type: String}, playerTwo: { type: String},
                                    playerThree: { type: String}, playerFour:{ type: String} },
                                10 : { playerOne: {type: String}, playerTwo: { type: String},
                                    playerThree: { type: String}, playerFour:{ type: String} },
                                11 : { playerOne: {type: String}, playerTwo: { type: String},
                                    playerThree: { type: String}, playerFour:{ type: String} },
                                12 : { playerOne: {type: String}, playerTwo: { type: String},
                                    playerThree: { type: String}, playerFour:{ type: String} },
                                13 : { playerOne: {type: String}, playerTwo: { type: String},
                                    playerThree: { type: String}, playerFour:{ type: String} }
                                , default: {}},
    round_winner:           {
                                1 : {type: String},
                                2 : {type: String},
                                3 : {type: String},
                                4 : {type: String},
                                5 : {type: String},
                                6 : {type: String},
                                7 : {type: String},
                                8 : {type: String},
                                9 : {type: String},
                                10 : {type: String},
                                11 : {type: String},
                                12 : {type: String},
                                13 : {type: String},
                            },
    got_round_winner:       { type: Number, default: 0}
});

gameModel.methods.assign_cards = function(){
    this.playerCards.playerOne = ["d_6" , "d_10", "d_7", "h_7", "c_K", "s_5", "h_5", "c_8", "h_A", "h_9", "d_2", "c_4", "d_8"];
    this.playerCards.playerTwo = [ "d_3", "d_9", "s_7", "s_4", "h_2", "d_4", "d_K", "c_3", "d_Q", "h_Q", "s_9", "c_10", "c_2"];
    this.playerCards.playerThree = ["h_6", "h_8", "s_6", "d_J", "h_J", "h_10", "c_J", "s_Q", "c_6", "c_A", "s_8", "s_3", "h_K"];
    this.playerCards.playerFour = ["s_10", "s_2", "c_9", "s_K", "c_5", "s_J", "h_4", "c_Q", "d_5", "s_A", "c_7", "h_3", "d_A"];
 }

gameModel.methods.increment_currentRound = function(){
    this.currentRound += 1
}

gameModel.methods.increment_playerCount = function(){
    this.playerCount += 1
}

gameModel.methods.set_trump = function(){
    this.trump = "s"            // Setting to spade for now
}

gameModel.methods.get_player_from_socket_id = function(socket_id){
    return _.invert(this.playerId)[socket_id];
}

gameModel.methods.has_everyone_predicted = function(){
    return (_.isNumber(this.predictedScore.playerOne) && _.isNumber(this.predictedScore.playerTwo) && _.isNumber(this.predictedScore.playerThree) && _.isNumber(this.predictedScore.playerFour));
}

gameModel.methods.find_round_winner = function( round_number){
   cards_of_round =  [];
   self = this 
   _.forEach(self.playerSequence, function(player){
        cards_of_round.push(self.rounds[round_number][player])
   })
   console.log("model", cards_of_round)
   winning_card = find_winner(cards_of_round, this.trump);

   player_by_cards = _.invert(self.rounds[round_number]) 
   winner = player_by_cards[winning_card]
   this.round_winner[round_number] = winner
   this.rotate_player_sequence(winner)
   this.currentScore[winner] += 1
   this.currentRound += 1
   this.save()
   console.log("Winner: " + winner + "Winning card" + winning_card )
}

gameModel.methods.rotate_player_sequence = function(winner){
    var playerSequence = this.playerSequence;
    var new_sequence = _.concat(_.slice(playerSequence, playerSequence.indexOf(winner), 4), _.slice(playerSequence, 0, playerSequence.indexOf(winner)))
    this.playerSequence = new_sequence
    this.save()
}

gameModel.methods.remove_card_from_players_deck = function(player, card_to_remove){
    self = this
    this.playerCards[player] = _.remove(self.playerCards[player], function(card){
        return card != card_to_remove
    })
}
module.exports = mongoose.model('Game', gameModel);
