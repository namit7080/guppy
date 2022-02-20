const express= require('express');

const passport= require('passport');


const router= express.Router();

const homeController= require('../controller/homecontroller1');
const accounthadler= require('../controller/accounthandler');

// Main Root Page
router.get('/',homeController.main);

// Log-in Page
router.get('/log-in',homeController.loginPage);

// Sing-up Page
router.get('/sing-in',homeController.singinPage);





// For (Creating and login and log-out) User
router.use('/account',require('./login-singup'));

// for Handling Post  and comment Creation
router.use('/post',require('./post'));

// for deleting Post and comment
router.use('/delete',require('./deletion'));

// For login/Singup by Google-Oauth
router.get('/users/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/users/auth/google/callback',
      passport.authenticate(
         'google',
      {failureRedirect: '/'},
),accounthadler.createmySession);

// For liking
router.use('/likes',require('./likes'));

module.exports=router;