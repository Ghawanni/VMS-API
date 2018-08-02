var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var AdminSchema = new mongoose.Schema({
  fname:{ type: String, required: true},
  lname:{ type: String, required: true},
  username:{ type: String, required: true, minlength: 3 },
  password:{ type: String, required: true, minlength: 6 },
  position:{ type: String, default: 'na'},
  phone:{ type: Number, required: true, minlength:10},
  organization:{ type: String, default: 'na'}
});

AdminSchema.pre('save', function(next){
  var admin = this;
  
  if(admin.isModified('password')){
    bycrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(admin.password, salt, (error, hash) => {
        admin.password = hash;
        next();
      });
    });
  } else { 
    next();
  }
});

var Admin = mongoose.model('admin', AdminSchema);

module.exports = { Admin };