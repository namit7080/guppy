const express= require('express');

const passport= require('passport');
const router= express.Router();

const deleterouter= require('../controller/deleteController');

// for deletion comment
router.get('/comment/:id',passport.checkauthentication,deleterouter.deleteComment);

// for deletion Post
router.get('/post/:id',passport.checkauthentication,deleterouter.deletePost);
module.exports=router;