const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// set up the schema
var ServiceSchema = new mongoose.Schema({
  type: {
    type:String,
    minlength: 1,
    required: true
  },
  languages:{
    type:String
  },
  certificates:{
    type: Boolean,
    required: true
  }
});


ServiceSchema.methods.toJSON = function () {
  var volunteer = this;
  var volunteerObject = user.toObject();

  return _.pick(volunteerObject, ['_id', 'type']);
};



//User Model
var Service = mongoose.model('service', ServiceSchema);

module.exports = {
  Service
};