var mongoose = require('mongoose');
var url = 'mongodb://mongo/test';

var mySchema = new mongoose.Schema({
  host: {type: String},
  message: String
});
 
Data = exports.Data = mongoose.model('data', mySchema);

exports.initializeMongo = () => {
  mongoose.connect(url, {useNewUrlParser: true});
  console.log('Trying to connect to '+ url);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', () => {
    console.log('Connected to Mongodb...');
  });
}