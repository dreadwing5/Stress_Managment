var express = require('express');
var router = express.Router();
var _ = require('lodash');
const Post = require('../models/Post');
var path = require('path');
var multer = require('multer');
const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth');
const app = require('../app');


var storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage
}).single('file');


//user compose route 
router.get('/compose', ensureAuthenticated, (req, res) => {
    res.render('compose-post', {
        success: ""
    })

    // let errors = [];
    // if (req.isAuthenticated()) {
    //     res.render('compose-post', {
    //         success: ""
    //     });
    // } else {
    //     errors.push({
    //         msg: 'Please login to view this page'
    //     });
    //     res.render('login',{errors});
    // }
});

router.post("/do-post", upload, function (req, res) {
    const title = req.body.postTitle;
    const slug = _.kebabCase(req.body.postTitle);
    const postContent = req.body.postBody;
    const image = req.file.filename;
    var date = new Date();
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const postDate = date.toLocaleDateString('en-US', options);

    const post = new Post({
        title: title,
        content: postContent,
        url: slug,
        image: image,
        date: postDate,
        author: req.user.id
    })
    post.save()
        .then(() => {
            res.render('compose-post', {
                success: "Post Published"
            });
            console.log("Data Added Successfully!");
        })
        .catch((err) => {
            console.log("An Error occured while adding data");
            console.log(err);
        })

});


//Blog Route Available to all user

router.get("/blog", function (req, res) {
    Post.find({}, function (err, post) {
        if (!err) {
            res.render('blog', {
                posts: post
            });

        }
    });

});

//Individual Post Route

router.get("/posts/:postname", (req, res) => {
    const requestedParam = _.kebabCase(req.params.postname);
    Post.findOne({
        url: requestedParam
    }, function (err, post) {
        if (post) {
            res.render('post', {
                title: post.title,
                postContent: post.content,
                image: post.image,
                date: post.date
            });
        } else {
            res.redirect("/blog");
        }
    })
});

router.get("/delete/:postid", (req, res) => {
    Post.deleteOne({
        _id: req.params.postid
    }, function (err) {
        if (!err) {
            Post.find({
                author: req.user.id
            }, function (err, foundPost) {
                if (!err) {
                    console.log("Post Deleted Successfully")
                    res.redirect("/user-page");
        
                }
            });
        } else {
            console.log(err)
        };
    })

})

//Require Authentication

router.get('/user-page', ensureAuthenticated, (req, res) => {
    //If user is logged in then open this page
    Post.find({
        author: req.user.id
    }, function (err, foundPost) {
        if (!err) {
            res.render('user-page', {
                posts: foundPost,
                success : ""
            });

        }
    });

});

module.exports = router;