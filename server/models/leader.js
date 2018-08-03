const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// set up the schema
var LeaderSchema = new mongoose.Schema({
  fName: { type: String, required: true, trim: true, minLength: 1, },
  lName: { type: String, trim: true, required: true, minlength: 1, },
  leader: { type: Boolean, required: true, default: true, },
  password: { type: String, required: true, minLength: 6 },
  skills: { type: String, required: true },
  phone: { type: Number, required: true, minlength: 10 },
  nationalId: { type: Number, minlength: 10, required: true },
  email: {
    type: String, required: true, trim: true, minLength: 1, unique: true,
    validate: { validator: validator.isEmail, message: '{VALUE} is not a valid email.' }
  },
  organization: { type: String, default: 'na' },
  lng: { type: Number },
  lat: { type: Number },
  placeOfOrigin: { type: String },
  dob: { type: Date },
  steps: { type: Number },
  workingHours: { type: Number },
  rank: { type: Number },
  score: { type: Number, required: true, default: 0 },
  uuid: { type: String, required: true }
});


LeaderSchema.methods.toJSON = function () {
  var leader = this;
  var leaderObject = leader.toObject();

  return _.pick(leaderObject, ['_id', 'nationalId', 'fName', 'lName']);
};


// this will add methods to your schema, you specify the method name after .methods property
// use only normal functions because of this keyword
////////////////////////////////////////////////////

// adding a middleware that will run before executing save() using this model
// the middleware will hash passwords
LeaderSchema.pre('save', function (next) {
  var leader = this;

  if (leader.isModified('password')) {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(leader.password, salt, (err, hash) => {
        leader.password = hash;
        next();
      })
    })
  } else {
    next();
  }
});

//User Model
var Leader = mongoose.model('leader', LeaderSchema);

module.exports = {
  Leader
};