const express = require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Video=require('./models/video');
const cors = require('cors')
const app=express();
const port=3000;
app.use(cors())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
(async function(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/videoplayer');
        console.log('success')
    }catch(err){
        console.log(err)
    }
})();
app.get('/',async(req,res)=>{
    video=await Video.find();
    res.json(video)
})
app.post('/create',async(req,res)=>
{
  const{name,url,description}=req.body;
  try{
  const video=new Video({
    name,
    url,
    description
  }); 
  res.json({
    data:await video.save()
  }); }
  catch(err){
    res.status(400).json({
        data:err
    });
  }
});
app.get('/:id',async(req,res)=>{
    const { id }=req.params;
    try{
    const video=await Video.findById(id);
    if(video)
    {
        res.json(video);
    }
    else
    {
        res.status(404).json({
            msg:'not found'
        });
    }
}catch(err){
    res.status(400).json({
        data:err
    });
}
});
app.put('/update/:id',async(req,res)=>{
    const{id}=req.params;
    const{name,url,description}=req.body;
    try{
    const video=await Video.findById(id);
    if(video){
        if(name!==undefined){
            video.name=name;
        }
        if(url!==undefined){
            video.url=url
        }
        if(description!==undefined){
            video.description=description;
        }
        res.json({
            data:await video.save()
        });
    }
    else{
        res.status(404).json({
            msg:'video not found'
        });
    }
    }
    catch(err){
    res.json({
        data:err
    });
}
});
app.delete('/:id',async(req,res)=>{
    const{id}=req.params;
    try{
        const video=await Video.findById(id);
        console.log(video)
        if(video){
            await video.deleteOne();
            res.sendStatus(204);
        }
        else{
            res.status(404).json({
                msg:'not found'
            });
        }
    }
    catch(err){
        res.status(400).json({
            data:err
        });
    }

})
app.listen(port,()=>{
    console.log('jjjjjjjjjj')
})