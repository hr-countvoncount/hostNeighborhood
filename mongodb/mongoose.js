var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/airbnb';

var messageSchema = new mongoose.Schema({
  id: {type: Number, index: true},
  toHost: {type: String},
  messageBody: String
});

var neighborhoodSchema = new mongoose.Schema({
  id: {type: Number, index: true},
  name: {type: String},
  joined: Date,
  location: String,
  city: String,
  numberOfReviews: Number,
  numberOfReferences: Number,
  isVerified: Boolean,
  isSuper: Boolean,
  responseRate: Number,
  avatar: String,
  responseTime: Number,
  languages: String,
  email: String,
  phoneNum: String,
  commuteTimeAvg: Number,
  commutePriceAvg: Number,
  localCurrency: String,
  neighborhoodDescr: String,
  policies: String,
  isCanc: Boolean,
  cancelation: String,
  locationsNearby: String
});

mongoose.connect(url, {useNewUrlParser: false});
console.log('Trying to connect to '+ url);
const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', () => {
//   console.log('Connected to Mongodb...');
// });

module.exports.Message = mongoose.model('message', messageSchema, 'messages');
module.exports.Neighborhood = mongoose.model('neighborhood', neighborhoodSchema, 'neighborhoods');