var chai = require('chai');
var chaiHttp = require('chai-http');
var chaiJsonSchema = require('chai-json-schema');
var server = require('./../src/server');
var expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

let taskJsonSchema = {
  title: 'Task schema',
  type: 'object',
  required: ['id', 'name', 'description', 'status', 'due_date'],
  properties: {
    id: {
      type:'integer',
      minimum: 0
    },
    name: {
      type: 'string'
    },
    description: {
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

let taskJsonCollectionSchema = {
  title: 'Tasks schema',
  type: 'object',
  required: ['tasks'],
  properties: {
    tasks: {
      type: 'array'
    }
  }
};

describe('GET all tasks', function(){
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
      expect(res.body).to.be.jsonSchema(taskJsonCollectionSchema);
      done();
    });
  });
});

describe('GET detail task', function(){
  it('GET should return with 200 status', (done) => {
    chai.request(server).get('/tasks/:id').end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('GET should return with application/json header', (done) => {
    chai.request(server).get('/tasks/:id').end((err, res) => {
      expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
      done();
    });
  });
  it('GET should return json object', (done) => {
    chai.request(server).get('/tasks/:id').end((err, res) => {
      expect(res).to.be.json;
      done();
    });
  });
  it('GET should return json object with the good schema', (done) => {
    chai.request(server).get('/tasks/:id').end((err, res) => {
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
  let task = {'id': 0, 'name': 'Hello world', 'description': 'Foo Bar', 'status': 1, 'due_date': Date.now()};

  it('POST should return with 201 status', (done) => {
    chai.request(server).post('/tasks').end((err, res) => {
      expect(res).to.have.status(201);
      done();
    });
  });
  it('POST should return with application/json header', (done) => {
    chai.request(server).post('/tasks').end((err, res) => {
      expect(res).to.have.header('content-type', 'application/json');
      done();
    });
  });
  it('POST should be called with json object with the good schema', (done) => {
    chai.request(server).post('/tasks').send(task).end((err, res) => {
      expect(res.request._data).to.have.property('id');
      expect(res.request._data).to.have.property('name');
      expect(res.request._data).to.have.property('description');
      expect(res.request._data).to.have.property('status');
      expect(res.request._data).to.have.property('due_date');
      done();
    });
  });
});
