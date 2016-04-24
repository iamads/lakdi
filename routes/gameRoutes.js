var express = require('express');

var routes = function(Game, io){
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
           game.set_trump();
           game.save();
           res.status(201).send(game) 
        });          // create a new game return game id and player cards

    gameRouter.route('/join')
        .post(function(req, res){
            Game.findById(req.body.gameId, function(err,game){
                if(err)
                    res.status(500).send(err)
                else{
                    switch (game.playerCount){
                        case 0:
                            game.playerId.playerOne = req.body.playerId;
                            game.increment_playerCount()
                            game.save();
                            res.status(200).send(game);
                            break;
                        case 1:
                            game.playerId.playerTwo = req.body.playerId;
                            game.increment_playerCount()
                            game.save();
                            res.status(200).send(game);
                            break;
                        case 2:
                            game.playerId.playerThree = req.body.playerId;
                            game.increment_playerCount()
                            game.save();
                            res.status(200).send(game);
                            break;
                        case 3:
                            game.playerId.playerFour = req.body.playerId;
                            game.increment_playerCount()
                            game.save();
                            res.status(200).send(game);
                            io.emit('predict_score_now', req.body.gameId);
                            break;
                        default:
                            res.status(500).send("Invalid player Count . Game fucked");
                    }
                }
            })
        })

    gameRouter.route('/:gameId/predictedscore')
        .post(function(req, res){
               console.log("Inside post");
               Game.findById(req.params.gameId, function(err,game){// I think it should be request.body. Check it now
                    if (err)
                        res.status(500).send(err)
                    else{
                        var player = game.get_player_from_socket_id(req.body.playerSocketId)
                        console.log("player", JSON.stringify(player) ) 
                        if (player != "Socket id not found!" ){
                            game.predictedScore[player] = req.body.predicted_score;
                            game.save(function(err){
                                if (err)
                                   res.status(500).send(err);
                                else
                                   res.status(201).send(game) ;  
                            })   
                        }
                       else
                            res.status(500).send("Who the fuq r u, ur Socket id was not found"); 
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
