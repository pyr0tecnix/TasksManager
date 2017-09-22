var chai = require('chai');
var expect = chai.expect;

var Server = require('./../src/server');

describe('Server', function(){
  it('getTasksOfTheDayList() should return 0', function(){
    var Server = new Server([]);
    expect(Server.getTasksOfTheDayList()).to.equal(0);
  });

});
