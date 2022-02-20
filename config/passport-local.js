// Import Passport
const passport= require('passport');

// Strategy Use in the passport
const LocalStagety = require('passport-local').Strategy;

// User Main Table Here 👈🏻
const User= require('../models/user');

// athentication using passportjs

passport.use( new LocalStagety({
    // Unique identify in Schema
      usernameField: 'email',
    // So that we have req here
      passReqToCallback:true

},function(req,email,password,done){

     // Find The User By email which is unique
     User.findOne({email:email},function (err,user) {
        if (err) {
            
            return done(err);
        }
       // If user is not found or password is incorrect
        if(!user||user.password!=password){
            req.flash('error','Invalid');
            return done(null, false);
        }
       // If User found 
         
         return done(null, user);
         
     })


}))

// inbuild Serialize Function to set id in Cookie 
passport.serializeUser(function (user, done) {
    // console.log("Done");
    done(null, user.id);
});

// inbuild deSerialize when browser back send the id
passport.deserializeUser(function (id, done) {
    User.findById(id, function (error, user) {
        if (error) {
            // console.log("There is an Error by Passport");
            req.flash('error','Database Error');
            return done(error);
        }
        return done(null, user);
    })
})

// Check if the User is Authenticated
passport.checkauthentication = function (req, res, next) {

    // If the user is Authenticated return to next function which is controller
    if (req.isAuthenticated()) {
        return next();
    }
    // If the user not sign in 
    return res.redirect('/');

}

passport.setAuthentication = function (req, res, next) {

    if (req.isAuthenticated()) {

        //  req. user contain the information from cookies and it will return to the res.local for views  
        res.locals.user = req.user;
    }
    next();


}


module.exports = passport;
