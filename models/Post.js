const mongoose = require('mongoose');
const User = require('../models/User');
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    url : String,
    image : String,
    date: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    
})
const Post = new mongoose.model('Post', PostSchema);

module.exports = Post;