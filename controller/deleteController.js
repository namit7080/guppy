const Comment= require('../models/comment');
const { modelName } = require('../models/post');
const Post= require('../models/post');
const Like= require('../models/like');

// fs module to delete avatar 
const fs= require('fs');
const path= require('path');

module.exports.deleteComment= function(req,res){
     Comment.findById(req.params.id,function(err,comment){
         if(req.user.id==comment.user){
            Like.deleteMany({likeable:comment, onmodel:'Comment'})
            let postId= comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}},function(err,post){
               if(err){
                  req.flash('error','Unable to Delete');
                  //  console.log("Error whilr deelting Comment");
                 }
               req.flash('success','Comment Deleted');
               return res.redirect('back');

            })


         }




     })



}


module.exports.deletePost= function(req,res){
     
   Post.findById(req.params.id,function(err,post){
      if(err){
         console.log(err);
      }


      if(req.user.id==post.user){
         if(post.avatar){
            fs.unlinkSync(path.join(__dirname,'..',post.avatar));
         }
         Like.deleteMany({likeable:post, onmodel:'Post'});
         Like.deleteMany({_id: {$in:post.comment}});

         post.remove();


         Comment.deleteMany({post:req.params.id},function(err){
            req.flash('success','Post Deleted');
            return res.redirect('/');
         })



      }



   })





}