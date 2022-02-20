const Post= require('../models/post');
const Comment= require('../models/comment');

// For Post Creation
module.exports.createPost= function (req,res) {


    Post.uploadedAvatar(req,res,function(err){

        if(err){
            console.log("Error Multer "+err);
        }
        console.log(req.file);
        
        Post.create({
            content:req.body.content,
            // req.user._id from Cokkies
            user: req.user._id,
            
        },function (err,post) {
            if(err){
                // console.log("Error While Creating Post "+err);
            }
            if(req.file){
                post.avatar= Post.avatarPath+'/'+req.file.filename;
            // uploads/user/avatar + /avatar-1647799(it is a req.file.filename)
                
                post.save();
               // to save the post; 
            }
            
            req.flash('success','Post-Created');
            return res.redirect('/');
            
        })

    })









    // Post.create({
    //     content:req.body.content,
    //     // req.user._id from Cokkies
    //     user: req.user._id
    // },function (err,posr) {
    //     if(err){
    //         console.log("Error While Creating Post");
    //     }
    //     req.flash('success','Post-Created');
    //     return res.redirect('/');
        
    // })
    
}

// Create Comment
module.exports.createComment= function (req,res) {
    Post.findById(req.body.postid,function(err,post){

        if(post){
            Comment.create({
                 content:req.body.comment,
                 user:req.user._id,
                 post:req.body.postid


            },function(err,comment){
               post.comment.push(comment);
               post.save();
               return res.redirect('back');

            })
        }


    })


    
}
