process.env.NODE_ENV = 'test';

var expect = require('chai').expect;
var valid_cards = require('../../utilities/valid_cards');

describe("Current suit is not  trump and current round cards is greater than 0", function(){
    it ('should only return cards bigger than current winning of round suit', function(done){
        var round_cards  = ['h_K','h_3'];
        var my_cards = ['h_A', 'h_4', 's_A', 's_2', 'c_3'];
        ans = valid_cards(round_cards, my_cards, 'c')
        expect(ans).to.eql(['h_A'])
        done()
    })
    it ('should return card of current suit if you have it', function(done){
        var round_cards = ['h_K','h_3'];
        var my_cards = ['h_Q', 'h_4', 's_A', 's_2','c_3'];
        ans = valid_cards(round_cards, my_cards, 'c');
        expect(ans).to.eql(['h_Q', 'h_4']);
        done();
    })
    describe ('but someone has thrown a trump', function(){
        it ('and you have current roundsuit', function(done){
            var round_cards = ['h_K', 'c_5', 'h_6' ];
            var my_cards = ['h_Q', 'h_4', 's_A', 's_2', 'c_3'];
            ans = valid_cards(round_cards, my_cards, 'c');
            expect(ans).to.eql(['h_Q', 'h_4']);
            done();
        });
        describe ('and you don\'t have current round suit', function(){
            it ('returns trumps bigger than winning till now',function(done){
                var round_cards = ['h_K', 'c_5', 'h_6' ];
                var my_cards = ['c_Q', 'c_J', 's_A', 's_2', 'c_3'];
                ans = valid_cards(round_cards, my_cards, 'c');
                expect(ans).to.eql(['c_Q', 'c_J']);
                done();
            })
            it ('returns all your cards if your trumps are smaller than winning till now', function(done){
                var round_cards =  ['h_K', 'c_K', 'h_6' ];
                var my_cards = ['c_Q', 'c_J', 's_A', 's_2', 'c_3'];
                ans = valid_cards(round_cards, my_cards, 'c');
                expect(ans).to.eql(['c_Q', 'c_J', 's_A', 's_2', 'c_3']);
                done();
            })
        })
    })
})
describe ("Round_suit_card is trump", function(){
    it ('but you don\'t have any trump return all cards', function(done){
        var round_cards = ['h_K', 'c_5', 'h_6' ];
        var my_cards = ['c_Q', 'c_J', 's_A', 's_2', 'c_3'];
        ans= valid_cards(round_cards, my_cards, 'd');
        expect(ans).to.eql(['c_Q', 'c_J', 's_A', 's_2', 'c_3']);
        done();
    })
})
