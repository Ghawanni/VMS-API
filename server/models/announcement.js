var mongoose = require('mongoose');

var AnnoucementSchema = new mongoose.Schema({ 
  text: { type: String, required: true, default:'Attention.'}
});

var Announcement = mongoose.model('announcement', AnnoucementSchema);

module.exports = { Announcement };