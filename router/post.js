const express= require('express');
const passport= require('passport');
const router= express.Router();


const postController= require('../controller/postcontroller');
// For creating New Post

router.post('/create',passport.checkauthentication,postController.createPost);

// For Creating Comment on Particular Post
router.post('/comment',passport.checkauthentication,postController.createComment);

module.exports=router;