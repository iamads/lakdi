var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var gameModel = new Schema({
    playerSequence:         {type: Array, degault: ["playerOne","playerTwo","playerThree","playerFour"]},
    playerType: {
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
        playerOne:          {type: Number},
        playerTwo:          {type: Number},
        playerThree:        {type: Number},
        playerFour:         {type: Number}
    },
    currentRound: {type: Array},
});

module.exports = mongoose.model('Game', gameModel);
