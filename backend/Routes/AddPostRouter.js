const express = require('express');
const router = express.Router();
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '100mb' }));  

const Post = require('../models/AddPost');
router.post('/',async (req,res)=>{
    try {
     const data =  req.body;
     const newPost =  new Post(data);
     const response = await newPost.save();
     console.log("data saved successfully");
     res.status(200).json(response);
    } catch (error) {
     console.log(error);
     res.status(500).json({error:'internal server error'});
    }
  })



  

 module.exports = router;
