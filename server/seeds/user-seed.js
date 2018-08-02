const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Volunteer } = require('../../models/todo');
const { Pilgrim } = require('../../models/user');
const { Service } = require('../mongoose') // service model path

var firstId = new ObjectID()
var secondId = new ObjectID();

var pilgrims = [{
  _id: firstId,
  email: 'habib@lol.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: firstId, access: 'auth' }, 'lol').toString()
  }]
}, {
  _id: secondId,
  email: 'suhaib@lol.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: firstId, access: 'auth' }, 'lol').toString()
  }]
}];

var volnuteers = [{
  _id: firstId,
  email: 'mohammed@lol.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: firstId, access: 'auth' }, 'lol').toString()
  }]
}, {
  _id: secondId,
  email: 'ibra@lol.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: firstId, access: 'auth' }, 'lol').toString()
  }]
}];


var populatePilgrims = (done) => {
  Pilgrim.remove({}).then(() => {
    Pilgrim.insertMany(pilgrims);
  }).then(() => {
    done();
  });
};

var populateVolunteers = (done) => {
  Volunteer.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => { done() }).catch((err) => {console.log(err)});
};

module.exports = { todos, populateTodos, populateUsers, users };