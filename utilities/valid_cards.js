var _ = require('lodash');
var find_winner = require('./find_winner')
var priority_table = require('./priority_table')

var valid_cards = function(current_round_cards, my_cards, trump){
    if (current_round_cards.length == 0){
       return my_cards // if first card can throw any card
    }
    else{
        var round_suit = current_round_cards[0][0];
        var winning_till_now = find_winner(current_round_cards, trump);
        
        /*If round suit is a trump then you have to throw a trump
         * only exception is when you don't have any trump, then you can throw any */
        if (round_suit == trump){            
            var valid_trumps = _.filter(my_cards, function(card){
                return (_.startsWith(card, trump))
            });
            if (valid_trumps.length > 0){
                var greater_than_winning_till_now = _.filter(valid_trumps, function(card){
                    return priority_table(card.split("_")[1]) > priority_table(winning_till_now.split('_')[1])
                });

                // If you have a card greater than winning card then you have to throw it

                if (greater_than_winning_till_now.length>0){
                    return greater_than_winning_till_now
                }
                else{
                    return valid_trumps
                }
            }
            else
                return my_cards
        }
        else{
            var round_suit_cards = _.filter(my_cards, function(card){
                return (_.startsWith(card, round_suit))
            })
            // If you have a round suit card , then you have to throw it
            if (round_suit_cards.length > 0){
                if (winning_till_now[0] == trump){
                    return round_suit_cards
                }
                else{
                    var greater_than_winning_till_now = _.filter(round_suit_cards, function(card){
                    return priority_table(card.split("_")[1]) > priority_table(winning_till_now.split('_')[1])
                });
                
                // If you have a round suit is greater than winning_round_suit_card, you have to throw that

                if (greater_than_winning_till_now.length > 0){
                    return greater_than_winning_till_now
                }
                else
                    return round_suit_cards
            }
            }
            else{
                // You have to throw a trump if you have a trump that is greatr than winning_till_now else you are free to throw any
                var trumps_you_have = _.filter(my_cards, function(card){
                    return (_.startsWith(card, trump))
                });
                if (winning_till_now[0] == trump){
                    trumps_you_have = _.filter(trumps_you_have, function(card){
                        return priority_table(card.split("_")[1]) > priority_table(winning_till_now.split('_')[1])
                    })
                }
                if (trumps_you_have.length > 0){
                    return trumps_you_have
                }
                else{
                    // If your trump is lower than winning_till_now you are free to throw any.
                    return my_cards
                }
            }
            } 
        }
    }

module.exports = valid_cards
