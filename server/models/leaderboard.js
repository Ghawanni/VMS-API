var mongoose = require('mongoose');

var LeaderboardSchema = new mongoose.Schema({
  volunteer: {type: String, required:true},
  score: { }
});