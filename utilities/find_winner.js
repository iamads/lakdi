var _ = require('lodash');

var find_winner = function(cards, trump){        // to find winner of round
    if (cards.length == 4){
    var round_suit = cards[0][0];
    _(cards).forEach(function(card){
        if _.startsWith(card, trump)
            trumps.push(card);
        if (trumps.length > 0){
            return largest_card_of_suit(trumps, trump);
        }
        else{
            return largest_card_of_suit(cards, round_suit)
        }
    }
    }
    else
        return "invalid number of cards"'
}
