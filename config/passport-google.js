const passport= require('passport');
const env= require('./environment');
const googleStragety= require('passport-google-oauth').OAuth2Strategy;
// Crypto To- generate Random password
const crypto= require('crypto');
// User Schema
const User= require('../models/user');
// for sending mail
const mail= require('../mailers/newUser')

// tell passport to use GoogleStragety
passport.use(new googleStragety({
    clientID:env.google_client_ID,
    clientSecret:env.google_client_Secret,
    // CallBack url hit when google say yes email id is exists
    callbackURL:env.google_callback_URL
  },function(accessToken,RefreshToken,profile,done){
       User.findOne({email:profile.emails[0].value}).exec(function(err,user){
           if(err){
            req.flash('error','Google Failed');
               return;
           }
           console.log(profile);
           if(user){
               return done(null,user);
           }
           else{
             User.create({
                 name:profile.displayName,
                 email:profile.emails[0].value,
                 password: crypto.randomBytes(20).toString('hex')
             },function(err,user){
                if(err){
                    req.flash('error','Failed');
                    return;
                }
                mail.newUser(profile.emails[0].value,profile.displayName)
                return done(null,user);
             })

           }

       })
       


  }


))

module.exports=passport;

