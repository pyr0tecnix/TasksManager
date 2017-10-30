process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var chaiJsonSchema = require('chai-json-schema');
var mongoose = require("mongoose");
var expect = chai.expect;

var server = require('./../src/server');

var TaskSchema = require('./../src/data/schema');
var TasksBDD = mongoose.model('TasksBDD', TaskSchema);

chai.use(chaiHttp);
chai.use(chaiJsonSchema);

var taskJsonSchema = {
  definitions : {
    'task' :
    {
      type: 'object',
      required: ['name', 'description', 'status', 'due_date'],
      properties: {
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
    }
  }
};

var taskJsonCollectionSchema = {
  type: 'array',
  required: ['tasks'],
  'tasks' :
  {
    type: 'object',
    properties: {
      items: {
        type: { "$ref": "#/definitions/task" }
      }
    }
  }
};

describe('Test API Endpoints', function() {
  var newTask1 = new TasksBDD({
    name: 'Concrete stuff to do',
    description: 'Clean my bedroom',
    status: 0,
    due_date: Date.now()
  });
  var newTask2 = new TasksBDD({
    name: 'Be a better man',
    description: 'Where to start ?',
    status: 2,
    due_date: Date.now()
  });
  newTask1.save(function(err) {
    if(err) {
      console.log(err);
    }
  });
  newTask2.save(function(err) {
    if(err) {
      console.log(err);
    }
  });

  describe('Get all tasks', function() {
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

  describe('Get detail task', function(){
    it('GET should return with 200 status', (done) => {
      chai.request(server).get('/tasks/' + newTask1._id).end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('GET should return with application/json header', (done) => {
      chai.request(server).get('/tasks/' + newTask1._id).end((err, res) => {
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
        done();
      });
    });
    it('GET should return json object', (done) => {
      chai.request(server).get('/tasks/' + newTask1._id).end((err, res) => {
        expect(res).to.be.json;
        done();
      });
    });
    it('GET should return json object with the good schema', (done) => {
      chai.request(server).get('/tasks/' + newTask1._id).end((err, res) => {
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

  describe('Add new task', function() {
    let task = {'name': 'Hello world', 'description': 'Foo Bar', 'status': 1, 'due_date': Date.now()};

    it('POST should return with 201 status', (done) => {
      chai.request(server).post('/tasks').end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
    });
    it('POST should return with application/json header', (done) => {
      chai.request(server).post('/tasks').end((err, res) => {
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
        done();
      });
    });
    it('POST should be called with json object with the good schema', (done) => {
      chai.request(server).post('/tasks').send(task).end((err, res) => {
        expect(res.request._data).to.have.property('name');
        expect(res.request._data).to.have.property('description');
        expect(res.request._data).to.have.property('status');
        expect(res.request._data).to.have.property('due_date');
        done();
      });
    });
  });

  describe('Update a task', function() {
    let task = {'name': 'Hello darkness my old friend', 'description': 'I come to talk with you again', 'status': 1, 'due_date': Date.now()};

    it('PUT should return with 200 status', (done) => {
      chai.request(server).put('/tasks/' + newTask1._id).end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('PUT should return with application/json header', (done) => {
      chai.request(server).put('/tasks/' + newTask1._id).end((err, res) => {
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
        done();
      });
    });
    it('PUT should be called with json object with the good schema', (done) => {
      chai.request(server).put('/tasks/' + newTask1._id).send(task).end((err, res) => {
        expect(res.request._data).to.have.property('name');
        expect(res.request._data).to.have.property('description');
        expect(res.request._data).to.have.property('status');
        expect(res.request._data).to.have.property('due_date');
        done();
      });
    });
  });

  describe('Delete a task', function() {
    it('DELETE should return with 200 status', (done) => {
      chai.request(server).delete('/tasks/' + newTask2._id).end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('DELETE should return with application/json header', (done) => {
      chai.request(server).delete('/tasks/' + newTask2._id).end((err, res) => {
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
        done();
      });
    });
  });

  TasksBDD.collection.drop();
});
