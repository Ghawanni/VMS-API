var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // choose promise library for mongoose to use
let db = {
  localhost: 'mongodb://127.0.0.1:27017/HajjHackathon',
};
mongoose.connect( db.localhost || db.mlab).then(() => {

}, (err) => {
  console.log(err);
});

module.exports = { mongoose };
