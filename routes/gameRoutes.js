var express = require('express');

var routes = function(Game){
    var gameRouter = express.Router();
    //var gameController = require
    gameRouter.route('/')
        .post()         // Don't know what to do here
        .get();          // Same here

    gameRouter.route('/new')
        .get(function(req, res){
           var game = new Game;
           // Should shuffle cards and assign it to player
           game.playerType.playerOne  = true;
           game.assign_cards();
           game.save();
           res.status(201).send(game) 
        });          // create a new game return game id and player cards

    gameRouter.route('/:gameId/predictedscore')
        .post(function(req, res){
               console.log("Inside post"); 
               Game.findById(req.params.gameId, function(err,game){
                    if (err)
                        res.status(500).send(err)
                    else{
                        console.log("Found Game" + JSON.stringify(req.body))
                        for (var player in req.body){
                            console.log(player);
                            if (["playerOne","playerTwo","playerThree","playerFour"].indexOf(player) > -1){
                                console.log("Found player");
                                game.predictedScore[player] = req.body[player];
                                game.save(function(err){
                                    if (err)
                                       res.status(500).send(err);
                                    else
                                       res.status(201).send(game) ;  
                                })   
                            }
                           // else                                              // Not valid the first parameter is not one player then willsend to else which is not wanted. Think of other way to check if one of the player
                           //     res.status(500).send("Wrong player"); 
                        }
                    } 
                }) 
            })         // set predicted score Only once so use some flag
        .get(function(req,res){
            Game.findById(req.params.gameId, function(err,game){
                if (err)
                    res.status(500).send(err)
                else
                    res.status(200).send(game.predictedScore)
            })
        });          // get urrent score in game

    gameRouter.route('/:gameId/round/:roundNumber/')
        .post(function(req,res){
            Game.findById(req.params.gameId, function(err,game){
                if (err)
                    res.status(500).send(err)
                else
                    if (req.params.roundNumber != game.currentRound)
                        res.status(500).send("Invalid round")
                    else{
                        game.rounds[req.params.roundNumber][req.body.player] = req.body.card;       //JSON:{ player: playerOne , card:"h_A"}
                        game.save;
                        res.status(200).send(game);
                    }
            })
        })         // Set Players cards
        .get(function(req,res){
            Game.findById(req.params.gameId, function(err,game){
                if (err)
                    res.status(500).send(err)
                else{
                    if (req.params.roundNumber >= game.currentRound)
                        res.status(500).send("Round didn't even start")
                    else
                        res.status(201).send(game.rounds[req.params.roundNumber])
                }
            })
        });         // Get other players card thrown for this round

    return gameRouter;
}

module.exports = routes;
