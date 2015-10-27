var expect = require('chai').expect;

var ashley = require('../../server/ashleyjs/index.js');

describe('getPicture function', function () {
    it('should get main picture from a wikipedia page', function(done) {
      console.log(ashley);
      ashley.getPicture('Eddy Merckx').should.equal('upload.wikimedia.org/wikipedia/commons/e/e8/Eddy_Merckx_Molteni_1973.jpg');
      ashley.getPicture('Sack of Antwerp').should.equal('upload.wikimedia.org/wikipedia/en/c/c1/The_Spanish_Fury.JPG');
      ashley.getPicture('Love').should.equal('upload.wikimedia.org/wikipedia/commons/a/a3/DickseeRomeoandJuliet.jpg');
    });

  describe('Wiki API call', function () {
    xit('Calls Wiki API and receives output after seeding RNN', function(done) {
      request(server)
        .get('/api/rnn/home')
        .expect(200)
        .expect(function(res) {
          expect(res.text).to.be.a('string');
        })
        .end(done);
    });

  });
});