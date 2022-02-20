const mongoose= require('mongoose');

const likes= new mongoose.Schema({

    user:{
        type : mongoose.Schema.Types.ObjectId,
         ref: 'Usertable'
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        refPath:'onmodel'
    },
    onmodel:{
         type:String,
         require:true,
         enum:['Post','Comment']

    }

},
{
    timestamps:true
})

const Like= mongoose.model('Like',likes);
module.exports=Like;