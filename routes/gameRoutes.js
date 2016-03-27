var express = require('express');

var routes = function(Game){
    var gameRouter = express.Router();
    //var gameController = require
    gameRouter.route('/')
        .post()         // Don't know what to do here
        .get();          // Same here

    gameRouter.route('/new')
        .get();          // create a new game return game id and player cards

    gameRouter.route('/:gameId/score')
        .post()         // set predicted score Only once so use some flag
        .get();          // get current score in game

    gameRouter.route('/:gameId/:roundNumber/')
        .post()         // Set Players cards
        .get();         // Get other players card thrown for this round

    return gameRouter;
}

module.exports = routes;
