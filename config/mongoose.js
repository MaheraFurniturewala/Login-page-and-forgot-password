const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error',console.error.bind(
    console,'error connecting to db'
)); 
db.once('open',()=>{
    console.log('Successfully connected to the db');
});

module.exports = db;