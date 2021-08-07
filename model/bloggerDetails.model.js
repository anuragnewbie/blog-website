const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    bloggerName: {
        type: String,
        required: true,
        trim: true
    },
    composeTitle: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    composeBody: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    blogImage: {
        data: Buffer,
        contentType: String
    },
    likeCount: {
        type: Number,
        default: 0
    },
    dislikeCount: {
        type: Number,
        default: 0
    }
},
{timestamps: true}
);

const Blogger = mongoose.model('Blogger', blogSchema);
module.exports = Blogger;