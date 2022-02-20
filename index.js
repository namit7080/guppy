const express= require('express');
const env= require('./config/environment');

const app= express();
const port= 8000;

// MongoDB
const db= require('./config/mongoose');

// Import Ejs-layout
const expresslayout= require('express-ejs-layouts');

//Import session
const session= require('express-session');

// Import Passport
const passport= require('passport');

// Import connect Flash
const connect_flash= require('connect-flash');

// Flash Middleware 
const flashMiddleware= require('./config/middleware');



// Import Connect-Mongo to connect the session and and mongoDB
const MongoStore= require('connect-mongo')(session);

// Import Passport Stragety
const passportLocal = require('./config/passport-local');

// Imprt Google Stragety
const GoogleStragety =  require('./config/passport-google');
// app.use(require('cors')())


// ChatBox

const chatserver= require('http').Server(app);
const chatSocket= require('./config/chat_socket').chatSocket1(chatserver);
chatserver.listen(4000);
console.log("Chat Socket is running");



// To handle the request response so that we can tacke it by req.body
app.use(express.urlencoded({extended:false}));

//// Set the Express-ejs-layout before setting route and view engine
app.use(expresslayout);

// Set the Views engine
app.set('view engine','ejs');

// Set the Views to render the the view file
app.set('views','views');


// Use Session in App or Express
app.use(session({
     name:'my_project',
     secret:env.session_cookie_path,
     saveUninitialized:false,
     resave:'false',
     cookie:{
      maxAge:(1000*10*60)
     },
     store: new MongoStore({
      mongooseConnection :db,
      autoRemove:'disabled'
      
    },function(err){
        console.log("Error");
      }
     )



}))
app.use(passport.initialize());
app.use(passport.session());


// Uploads
app.use('/uploads', express.static(__dirname+'/uploads'));

// Set Authentication so that we use local in EJS
app.use(passport.setAuthentication);
// Set Flash
app.use(connect_flash());
app.use(flashMiddleware.setflash);


// set the static file like css,js etc.
app.use(express.static(env.asset_path));
//  use router at the end 
app.use('/',require('./router'));




app.listen(port,function(err){
    if(err){
       console.log(err); return;
    }
    console.log(`server is running on port :${port}`);
 
 });
