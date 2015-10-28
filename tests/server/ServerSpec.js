var request = require('supertest');
var expect = require('chai').expect;
var express = require('express');

var server = require('../../server/server.js');
var ashley = require('../../server/rnn/ashleyRnn.js');

describe('Server Tests', function () {

  describe('Search Bar', function () {

    it('Sends seed to RNN and receives output', function(done) {
      request(server)
        .get('/api/rnn/?text=home&type=shakespeare')
        .expect(200)
        .expect(function(res) {
          expect(res.text).to.be.a('string');
        })
        .end(done);
    });
  });

  describe('Wiki API call', function () {
    it('Calls Wiki API and receives output after seeding RNN', function(done) {
      request(server)
        .get('/api/rnn/home')
        .expect(200)
        .expect(function(res) {
          expect(res.text).to.be.a('string');
        })
        .end(done);
    });

  })
});
