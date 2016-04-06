var _ = require('lodash');

var priority_table = function(card_value){
    cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    return _.indexOf(cards, card_value);
}

module.exports = priority_table
