const express= require('express');
// Import Passport to check Autentication
const passport= require('passport');
const router= express.Router();
const accounthadler= require('../controller/accounthandler');

// To Create New user 
router.post('/create',accounthadler.create);


// Log-in User and Create Session 
router.post('/log-in-account',passport.authenticate(
    // name of stragety which is local
    'local',
    // if it is fail
    {failureRedirect: '/'},
),accounthadler.createmySession);

// Log-out user or DestroySession
router.get('/sing-out',accounthadler.destroySession);




module.exports=router;