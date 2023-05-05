const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://muktheswar:muktheswar@cluster0.xneny63.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});