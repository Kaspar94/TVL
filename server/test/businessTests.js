var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var fs = require('fs');

const clients = require("../api/data/clients.json"); // read in clients.json to reset it after all tests

const testClient1 = {"id":0,"axapta":"24510","street":"J. V. Jannseni 28","name":"Test klient","city":"Pärnu","postIndex":"80010","country":"EE","deliveryCountry":"LV","serviceNumber":"CI"}
const emptyClientFile = {"nextId":1,"fields":["axapta","street","name","city","postIndex","country","deliveryCountry","serviceNumber"],"data":[testClient1]};

var testUsername = "admin";
var testPassword = "admin";

chai.use(chaiHttp);

describe('BusinessClients', () => {

  beforeEach(function(done){ // before each test write clients.json to test one, where there is only one client
    fs.writeFile("./api/data/clients.json", JSON.stringify(emptyClientFile), (err) => {
      done();
    });
  });

  afterEach(function(done){
    done();
  });

  after(function(done) { // after all tests, reset clients.json to the old one.
    fs.writeFile("./api/data/clients.json", JSON.stringify(clients), (err) => {
      done();
    });
  });

  it('it should list ALL business clients on /businessClient GET', (done) => {
    chai.request(server)
      .get('/businessClient')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('axapta');
        res.body[0].should.have.property('street');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('city');
        res.body[0].should.have.property('postIndex');
        res.body[0].should.have.property('country');
        res.body[0].should.have.property('deliveryCountry');
        res.body[0].should.have.property('serviceNumber');
        res.body[0].id.should.equal(0);
        res.body[0].axapta.should.equal('24510');
        res.body[0].street.should.equal('J. V. Jannseni 28');
        res.body[0].name.should.equal('Test klient');
        res.body[0].city.should.equal('Pärnu');
        res.body[0].postIndex.should.equal('80010');
        res.body[0].country.should.equal('EE');
        res.body[0].deliveryCountry.should.equal('LV');
        res.body[0].serviceNumber.should.equal('CI');
        done();
      });
  });

  it('it should list ALL business clients on /businessClient/l GET', (done) => {
    chai.request(server)
      .get('/businessClient/l')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        res.body[0].should.have.property('id');
        res.body[0].should.not.have.property('axapta');
        res.body[0].should.not.have.property('street');
        res.body[0].should.have.property('name');
        res.body[0].should.not.have.property('city');
        res.body[0].should.not.have.property('postIndex');
        res.body[0].should.not.have.property('country');
        res.body[0].should.have.property('deliveryCountry');
        res.body[0].should.not.have.property('serviceNumber');
        res.body[0].id.should.equal(0);
        res.body[0].name.should.equal('Test klient');
        res.body[0].deliveryCountry.should.equal('LV');
        done();
      });
  });

  it('it should list SINGLE business clients on /businessClient/l/<id> GET', (done) => {
    chai.request(server)
      .get('/businessClient/l/0')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.not.have.property('axapta');
        res.body.should.not.have.property('street');
        res.body.should.have.property('name');
        res.body.should.not.have.property('city');
        res.body.should.not.have.property('postIndex');
        res.body.should.not.have.property('country');
        res.body.should.have.property('deliveryCountry');
        res.body.should.not.have.property('serviceNumber');
        res.body.id.should.equal(0);
        res.body.name.should.equal('Test klient');
        res.body.deliveryCountry.should.equal('LV');
        done();
      });
  });

  it('it should list a SINGLE business client on /businessClient/<id> GET', (done) => {
    chai.request(server)
      .get('/businessClient/0')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('axapta');
        res.body.should.have.property('street');
        res.body.should.have.property('name');
        res.body.should.have.property('city');
        res.body.should.have.property('postIndex');
        res.body.should.have.property('country');
        res.body.should.have.property('deliveryCountry');
        res.body.should.have.property('serviceNumber');
        res.body.id.should.equal(0);
        res.body.axapta.should.equal('24510');
        res.body.street.should.equal('J. V. Jannseni 28');
        res.body.name.should.equal('Test klient');
        res.body.city.should.equal('Pärnu');
        res.body.postIndex.should.equal('80010');
        res.body.country.should.equal('EE');
        res.body.deliveryCountry.should.equal('LV');
        res.body.serviceNumber.should.equal('CI');
        done();
      });
  });

  it('it should respond id not found on /businessClient<id> GET', (done) => {
    chai.request(server)
      .get('/businessClient/4')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('cause');
        res.body.status.should.equal('error');
        res.body.cause.should.equal('id not found');
        done();
      })
  });

  it('it should add a SINGLE business client on /businessClient POST', (done) => {
    chai.request(server)
      .post('/businessClient')
      .auth(testUsername, testPassword)
      .send({
        "axapta": "12345",
        "street": "testStreet",
        "name": "testName",
        "city": "testCity",
        "postIndex": "123456",
        "country": "EE",
        "deliveryCountry": "EE",
        "serviceNumber": "CI"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('axapta');
        res.body.should.have.property('street');
        res.body.should.have.property('name');
        res.body.should.have.property('city');
        res.body.should.have.property('postIndex');
        res.body.should.have.property('country');
        res.body.should.have.property('deliveryCountry');
        res.body.should.have.property('serviceNumber');
        res.body.id.should.equal(1);
        res.body.axapta.should.equal('12345');
        res.body.street.should.equal('testStreet');
        res.body.name.should.equal('testName');
        res.body.city.should.equal('testCity');
        res.body.postIndex.should.equal('123456');
        res.body.country.should.equal('EE');
        res.body.deliveryCountry.should.equal('EE');
        res.body.serviceNumber.should.equal('CI');
        done();
      });
  });

  it('it should add a SINGLE business client on /businessClient POST - with empty fields', (done) => {
    chai.request(server)
      .post('/businessClient')
      .auth(testUsername, testPassword)
      .send({
        "axapta": "12345"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('axapta');
        res.body.should.have.property('street');
        res.body.should.have.property('name');
        res.body.should.have.property('city');
        res.body.should.have.property('postIndex');
        res.body.should.have.property('country');
        res.body.should.have.property('deliveryCountry');
        res.body.should.have.property('serviceNumber');
        res.body.id.should.equal(1);
        res.body.axapta.should.equal('12345');
        res.body.street.should.equal('');
        res.body.name.should.equal('');
        res.body.city.should.equal('');
        res.body.postIndex.should.equal('');
        res.body.country.should.equal('');
        res.body.deliveryCountry.should.equal('');
        res.body.serviceNumber.should.equal('');
        done();
      });
  });

  it('it should delete a SINGLE business client on /businessClient<id> DELETE', (done) => {
    chai.request(server)
      .delete('/businessClient/0')
      .auth(testUsername, testPassword)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        done();
      })
  });

  it('it should respond id not found on /businessClient<id> DELETE', (done) => {
    chai.request(server)
      .delete('/businessClient/4')
      .auth(testUsername, testPassword)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('cause');
        res.body.status.should.equal('error');
        res.body.cause.should.equal('id not found');
        done();
      })
  });

  it('it should respond id not found on /businessClient<id> PUT', (done) => {
    chai.request(server)
      .put('/businessClient/4')
      .auth(testUsername, testPassword)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('cause');
        res.body.status.should.equal('error');
        res.body.cause.should.equal('id not found');
        done();
      })
  });

  it('it should update a SINGLE business client on /businessClient/<id> PUT', (done) => {
    chai.request(server)
      .put('/businessClient/0')
      .auth(testUsername, testPassword)
      .send({"name": "newName"})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('axapta');
        res.body.should.have.property('street');
        res.body.should.have.property('name');
        res.body.should.have.property('city');
        res.body.should.have.property('postIndex');
        res.body.should.have.property('country');
        res.body.should.have.property('deliveryCountry');
        res.body.should.have.property('serviceNumber');
        res.body.id.should.equal(0);
        res.body.axapta.should.equal('24510');
        res.body.street.should.equal('J. V. Jannseni 28');
        res.body.name.should.equal('newName');
        res.body.city.should.equal('Pärnu');
        res.body.postIndex.should.equal('80010');
        res.body.country.should.equal('EE');
        res.body.deliveryCountry.should.equal('LV');
        res.body.serviceNumber.should.equal('CI');
        done();
      });
  });

  it('it should list SOME business clients on /businessClient/where?city=Pärnu GET', (done) => {
    chai.request(server)
      .get('/businessClient/where?city=Pärnu')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      });
  });

  it('it should list NO business clients on /businessClient/where?city=rnu GET', (done) => {
    chai.request(server)
      .get('/businessClient/where?city=rnu')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('it should list SOME business clients on /businessClient/wheree?city=*rnu GET', (done) => {
    chai.request(server)
      .get('/businessClient/where?city=*rnu')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      });
  });
});
