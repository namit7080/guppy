const mongoose= require('mongoose');
const env= require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`);
const db= mongoose.connection;

db.on('error',console.error.bind(console,'Error Connecting to Database'));

db.once('open',function(){
     console.log('Connect to database');
});

module.exports=db;