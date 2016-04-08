process.env.NODE_ENV = 'test';
var expect = require('chai').expect;
priority_table = require('../../utilities/priority_table')

describe("Priority Table", function(){
    it ('should return a number', function(done){
        var ans = priority_table("K");
        expect(ans).to.be.ok;
        expect(ans).to.be.a('number');
        done();
    });
    it ('should return a number b/w 0 and 12 inclusive', function(done){
        var cards =["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
        var rand = cards[Math.floor(Math.random() * cards.length)]
        var ans = priority_table(rand);
        expect(ans).to.be.within(0,12);
        done();
    })
    it ('should gracefully handle invalid input', function(done){
        var ans = priority_table("random_shit");
        expect(ans).to.be.a('String')
        expect(ans).to.eql("Invalid Input")
    })
});
