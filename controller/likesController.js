const Like= require('../models/like');
const Post= require('../models/post');
const Comment= require('../models/comment');


module.exports.toggleLike= async function(req,res){
      
    try{
        
        let likeable;
        let deleted=false;

        // If Like for Post
        if(req.query.type=='Post'){
           
            likeable= await Post.findById(req.query.id).populate('likes');
        }
        else{
          

            likeable= await Comment.findById(req.query.id).populate('likes');
        }

        // Check if like is already Exists

        let LikeExist=await Like.findOne({
                user:req.user._id,
                likeable:req.query.id,
                onmodel:req.query.type
        })

        // If like present then delete it
        if(LikeExist){
             
              likeable.likes.pull(LikeExist._id);
              likeable.save();
              LikeExist.remove();
              deleted=true;

         }
         else{
           let newlike= await  Like.create({
               user:req.user._id,
               likeable:req.query.id,
               onmodel:req.query.type    
             })
            likeable.likes.push(newlike._id);
            likeable.save();

         }
         return res.redirect('/');



    }
    catch(err){
        console.log("Error in likes "+err);
    }







}