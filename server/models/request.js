var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
  text: { type: String, default: 'na' },
  sendTo: { type: String, required:true, default:'none', },
  acceptedBy: { type: String, default: 'none',},
  lat: { type: Number, required: true},
  lng: { type: Number, required: true},
  skillType: { type: Number, }
});

var Request = mongoose.model('request', RequestSchema);

module.exports = { Request };