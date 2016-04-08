process.env.NODE_ENV = 'test';
var expect = require('chai').expect
var largest_card_of_suit = require('../../utilities/largest_card_of_suit');

describe("Largest card of suit", function(){
    it ('should return a card of suit', function(done){
        var cards = ['s_A', 'h_A', 'c_A', 'd_A'];
        var ans = largest_card_of_suit(cards, 'd');
        expect(ans).to.eql('d_A');
        done();
    });

    it ('should return largest card of suit', function(done){
        var cards = ['d_2', 'd_5', 'd_J', 'd_A'];
        var ans = largest_card_of_suit(cards, 'd');
        expect(ans).to.eql('d_A');
        done();
    });

    it ('should gracefully handle empty cards array', function(done){
        var ans = largest_card_of_suit([], 'd');
        expect(ans).to.be.a(String);
        expect(ans).to.eql("Invalid Input");
        done();
    })
   
})

