var expect = require('chai').expect;
var should = require('chai').should;

var ashley = require('../../server/ashleyjs/index.js');

describe('getPicture function', function () { 
  it('should get main picture from a wikipedia page about a person', function(done) {
    ashley.getPicture('Eddy Merckx', function(result) {
      expect(result).to.equal('upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Eddy_Merckx_Molteni_1973.jpg/220px-Eddy_Merckx_Molteni_1973.jpg');
      done();
    });
  });
  
  it('should get main picture from a wikipedia page about a general subject', function(done) {
    ashley.getPicture('Love', function(result) {
      expect(result).to.equal('upload.wikimedia.org/wikipedia/commons/thumb/a/a3/DickseeRomeoandJuliet.jpg/220px-DickseeRomeoandJuliet.jpg');
      done();
    });
  });
});

describe('getHeaders function', function () {
    
  it('should get first 3 headers of a wiki page', function(done) {
    ashley.getHeaders('Love', function(result) {
      expect(result).to.eql(['Definitions', 'Impersonal love', 'Interpersonal love']);
      done();
    });
  });
});

