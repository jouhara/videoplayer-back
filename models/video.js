const mongoose=require('mongoose');
const videoSchema=new mongoose.Schema({
    name:String,
    url:String,
    description:String
})
module.exports=mongoose.model('Video',videoSchema)