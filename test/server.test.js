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
  let date1 = new Date();
  let date2 = new Date();

  date1.setHours(0,0,0,0);
  date2.setHours(0,0,0,0);
  var newTask1 = new TasksBDD({
    name: 'Yesterday : Concrete stuff to do',
    description: 'Clean my bedroom',
    status: 0,
    due_date: date1.setDate(new Date().getDate() - 1)
  });
  var newTask2 = new TasksBDD({
    name: 'Today : Be a better man',
    description: 'Where to start ?',
    status: 1,
    due_date: (new Date()).setHours(0,0,0,0)
  });
  var newTask3 = new TasksBDD({
    name: 'Tomorrow : Sleep',
    description: 'All day long',
    status: 2,
    due_date: date2.setDate(new Date().getDate() + 1)
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
  newTask3.save(function(err) {
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

  describe('Get all the tasks of today', function() {
    it('GET should return with 200 satus', (done) => {
      chai.request(server).get('/tasks/today').end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('GET should return with application/json header', (done) => {
      chai.request(server).get('/tasks/today').end((err, res) => {
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
        done();
      });
    });
    it('GET should return json object', (done) => {
      chai.request(server).get('/tasks/today').end((err, res) => {
        expect(res).to.be.json;
        done();
      });
    });
    it('GET should return json object with the good schema', (done) => {
      chai.request(server).get('/tasks/today').end((err, res) => {
        expect(res.body).to.be.jsonSchema(taskJsonCollectionSchema);
        done();
      });
    });
    it('GET should return task with due_date less or equal to today', (done) => {
      chai.request(server).get('/tasks/today').end((err, res) => {
        expect(res.body).to.have.lengthOf(2);
        done();
      });
    });
  });

  describe('Get all the tasks of given day', function() {
    it('GET should return with 200 status', (done) => {
      chai.request(server).get('/tasks/day').query({ 'date': (new Date().setHours(0,0,0,0))}).end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('GET should return with application/json header', (done) => {
      chai.request(server).get('/tasks/day').query({ 'date': (new Date().setHours(0,0,0,0))}).end((err, res) => {
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
        done();
      });
    });
    it('GET should return json object', (done) => {
      chai.request(server).get('/tasks/day').query({ 'date': (new Date().setHours(0,0,0,0))}).end((err, res) => {
        expect(res).to.be.json;
        done();
      });
    });
    it('GET should return json object with the good schema', (done) => {
      chai.request(server).get('/tasks/day').query({ 'date': (new Date().setHours(0,0,0,0))}).end((err, res) => {
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
