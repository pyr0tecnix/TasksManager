var chai = require('chai');
var chaiHttp = require('chai-http');
var chaiJsonSchema = require('chai-json-schema');
var server = require('./../src/server');
var expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

describe('GET tasks', function(){
  let taskJsonSchema = {
    title: 'Task schema',
    type: 'object',
    required: ['id', 'name', 'status', 'due_date'],
    properties: {
      id: {
        type:'integer',
        minimum: 0
      },
      name: {
        type: 'string'
      },
      status: {
        type: 'integer'
      },
      due_date: {
        type: 'number'
      }
    }
  };
  it('GET should return with 200 status', (done) => {
    chai.request(server).get('/tasks').end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('GET should return with application/json header', (done) => {
    chai.request(server).get('/tasks').end((err, res) => {
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      done();
    });
  });
  it('GET should return json object', (done) => {
    chai.request(server).get('/tasks').end((err, res) => {
      expect(res).to.be.json;
      done();
    });
  });
  it('GET should return json object with the good schema', (done) => {
    chai.request(server).get('/tasks').end((err, res) => {
      expect(res.body).to.be.jsonSchema(taskJsonSchema);
      done();
    });
  });
});

describe('GET random page should return 404', function(){
  it('GET should return with 404 status', (done) => {
    chai.request(server).get('/random').end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });
});

describe('POST tasks', function(){
  it('POST should return with 201 status', (done) => {
    chai.request(server).post('/tasks').end((err, res) => {
      expect(res).to.have.status(201);
      done();
    });
  });
});
