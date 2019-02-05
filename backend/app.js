const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const Post = require('./models/post');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mongoToDoApp')
.then(() => {
    console.log('MongoDb is connected');
}).catch(() => {
    console.log('MongoDB Connection Failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req,res,next)=> {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
});

app.post('/api/posts', (req,res,next)=> {
        const post = new Post({
            header: req.body.header,
            Content: req.body.Content,
        });
        post.save().then(createdPostId => {
            console.log(post);
            console.log(mongoose);        
            res.status(201).json({
                message : "Post added successfully!!",
                postId : createdPostId._id
            });
        });        
});

app.get('/api/posts', (req,res,next) => {

    /*
    const posts = [
        {
            id: 'fd4s56fds456',
            header: 'First Node JS Post',
            Content: 'Content1 from server'
        },{
            id: 'errew456dd5d5d',
            header: 'Second Node JS Post',
            Content: 'Content2 from server'
        }
    ];

    */

    Post.find()
    .then(documents => {
        console.log(documents);
        res.status(200).json({
            message : "Post retrieved successfully!!",
            posts: documents
        });
    })
    .catch();

  
});

app.delete('/api/posts/:id', (req,res,next) => {
   Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(201).json({
            message : "Post deleted successfully!!"
        });
   }).catch();
});
 
module.exports = app;