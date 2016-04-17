process.env.NODE_ENV = 'test';

var expect = require('chai').expect;
var find_winner = require('../../utilities/find_winner');
var cards = ['s_A','h_2','s_3','c_2']
describe("Find winner", function(){
    it ('should return a string', function(done){
        ans = find_winner(cards, 'c')
        expect(ans).to.be.a('string')
        done()
    })
    it ('should return the strongest of round suit if no trump', function(done){
        ans = find_winner(cards , 'd');
        expect(ans).to.equal('s_A');
        done();
    })
    it ('should return trump if trump is present',function(done){
        ans = find_winner(cards, 'h');
        expect(ans).to.equal('h_2');
        done()
    })
    it ('should return error if cards are more than 4', function(done){
        ans = find_winner(['s_A','h_2','s_3','c_2','s_Q'], 's')
        expect(ans).to.eql("invalid number of cards");
        done()
    })
     it ('should return error if zero cards', function(done){
        ans = find_winner([], 's')
        expect(ans).to.eql("invalid number of cards");
        done()
    })

})
