const mongoose = require('mongoose');

const commentScheme= new mongoose.Schema({
     content:{
         type:'string',
         required:true
     },
     user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Usertable'
       
     },
     post:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Post'

     },
     likes:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Like'
  }]


},{
  timestamps:true
})

const Comment= mongoose.model('Comment',commentScheme);
module.exports=Comment;