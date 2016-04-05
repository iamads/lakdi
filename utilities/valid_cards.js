_ = require('lodash');

var valid_cards = function(current_round_cards, my_cards, trump){
    if (current_round_cards.length == 0){
       return my_cards.pop()            // my cards is in ascending power. So last element is most powerful
    }
    else{
        var winning_till_now = find_winning_card(current_round_cards, trump);
    }

}


