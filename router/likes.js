const express= require('express');

const router= express.Router();

const LikeController= require('../controller/likesController');

router.get('/toggle',LikeController.toggleLike);

module.exports= router;