const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mongoToDoApp', { useNewUrlParser: true })
.then(() => {
    console.log('MongoDb is connected');
}).catch(() => {
    console.log('MongoDB Connection Failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images',express.static(path.join('backend/images')));

app.use((req,res,next)=> {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;