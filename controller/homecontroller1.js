const Post=require('../models/post'); 
const User= require('../models/user');

const Comment=require('../models/comment');
const Livemessage= require('../models/livemessage');

// Main Page in which We populate Post
module.exports.main= async function (req,res) {
    try{
        let post= await  Post.find({})
        .sort('-createdAt')
        .populate('user').
        populate({
             path:'comment',
             populate:{
                  path:'user'
             },
            
        }).populate('likes');
        let Live= await Livemessage.find({});
        
        // let user= await User.find({});
       

        return res.render('main',{
                  post:post,
                  Live:Live,
                  
        });
     }catch(error){
        console.log(error);
        return;
     }
    
    

    
    
}

// To render log-in Page
module.exports.loginPage= function (req,res) {
    
    return res.render('log-in');
}

// To render Sing-up Page
module.exports.singinPage= function (req,res) {
    
    return res.render('singup');
}


