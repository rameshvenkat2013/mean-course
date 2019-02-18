const express = require('express');
const multer = require('multer');
const Post = require('../models/post')

const router = express.Router();

const MIMETYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIMETYPE[file.mimetype];
        let err = new Error('Invalid MIME Type');
        if(isValid){
            err = null;
        }
        cb(null,"backend/images");
    },
    filename: (req,file,cb) => {
        const name = file.originalname; //.toLowerCase; //.split(' ').join('_');
        //console.log(name); return false;
        const ext = MIMETYPE[file.mimetype];
        cb(null, name +'-'+ Date.now() +'.'+ ext);
    }
});

router.post('', multer({storage: storage}).single('image'), (req,res,next)=> {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        header: req.body.header,
        Content: req.body.Content,
        imagePath: url + '/images/' + req.file.filename
    });
    post.save().then(createdPost => {
        //console.log(post);
        //console.log(mongoose);        
        res.status(201).json({
            message : "Post added successfully!!",
            //postId : createdPostId._id
            post : {
                    ...createdPost,
                    id: createdPost._id,
                    /*header: createdPost.header,
                    content: createdPost.Content,
                    imagePath: createdPost.imagePath*/
                }
        });
    });
});


router.put('/:id', multer({storage: storage}).single('image'), (req,res,next)=> {
    let imagePath = req.body.imagePath;
    if(req.file){
        const url = req.protocol + "://" + req.get('host');
        imagePath = url + "/images/" + req.file.filename;
    }
const post = new Post({
    _id: req.body.id,
    header: req.body.header,
    Content: req.body.Content,
    imagePath: imagePath
});
//console.log(req);
//return false;
Post.updateOne({_id:req.params.id}, post).then(createdPostId => {
    res.status(200).json({
        message : "Post Updated successfully!!",
        postId : createdPostId._id
    });
});        
});

router.get('/:id', (req,res,next) => {
    Post.findById(req.params.id).then(post => {
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message: 'Post not found'});
        }
    });
});

router.get('', (req,res,next) => {

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

const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    /**
     * + sign is used to typecast data into integer
     */
    const postQuery = Post.find();
    if(pageSize && currentPage){
        postQuery.skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }

    postQuery.then(documents => {
    //console.log(documents);
    res.status(200).json({
        message : "Post retrieved successfully!!",
        posts: documents
    });
})
.catch();


});

router.delete('/:id', (req,res,next) => {
Post.deleteOne({_id: req.params.id}).then(result => {
    //console.log(result);
    res.status(201).json({
        message : "Post deleted successfully!!"
    });
});
});


module.exports = router;