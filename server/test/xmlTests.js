var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var config = require('config')
var fs = require('fs');

chai.use(chaiHttp);

describe('xmlController', () => {


  it('it should retrieve XML file on /return/client PUT', (done) => {
    chai.request(server)
      .put('/return/client')
      .send({
	"client_name" : "Kaspar",
	"client_number" : "56553854",
	"business_id" : 1
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.xml;
        done();
      });
  });

  it('it should list all available countries /returnCountries GET', (done) => {
    chai.request(server)
      .get('/returnCountries')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
  

});
