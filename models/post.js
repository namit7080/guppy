const mongoose = require('mongoose');

//import mutler so that we can handle multipartdata-type
const multer= require('multer');
const path= require('path');
const Avatar_Path= path.join('/uploads/users/avatar')

const postSchema= new mongoose.Schema({
   content:{
       type:'string',
       required: true
   },
   user:{
       type : mongoose.Schema.Types.ObjectId,
       ref:'Usertable'
   },
   comment:[{
       type: mongoose.Schema.Types.ObjectId,
       ref:'Comment'
   }],
   likes:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Like'
   }],
   avatar:{
       type:'string'
    }

},{
    timestamps:true
})

let storage= multer.diskStorage({
    // where the file to be store
    destination: function(req,file,cb){
        cb(null,path.join(__dirname, '..',Avatar_Path));
            //  models+ one step back + avatar_path
    },
    // name of file 
    filename: function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
        // fieldname is avatar
    }


})

// Static Function         only single file for name=avatar
postSchema.statics.uploadedAvatar= multer({
    storage:storage,
    fileFilter: function(req,file,cb){
        if(file.mimetype=="image/png"||file.mimetype=="image/jpg"||file.mimetype=="image/jpeg"){
            cb(null,true);
        }
        else{
            cb(null,false);
            return cb(new Error("Only Jpg, png file Allowed"))
        }
    }


}).single('avatar'); 
postSchema.statics.avatarPath=Avatar_Path;



const Post= mongoose.model('Post',postSchema);
module.exports=Post; 