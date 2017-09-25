var chai = require('chai');
var chaiHttp = require('chai-http');
var Server = require('./../src/server');
var expect = chai.expect;

chai.use(chaiHttp);


describe('GET TasksListOfTheDay', function(){
  it('GET should return json object', function(){
    chai.request(server)
    .get('/TasksListOfTheDay')
    .end((err, res) => {
      expect(res).to.be.json;
      done();
    });
  });
});
