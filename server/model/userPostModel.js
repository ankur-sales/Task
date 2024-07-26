const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPostSchema = new Schema({

    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, // Reference to User model

    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
},
    { timestamps: true });

const UserPost = mongoose.model('UserPost', userPostSchema);
module.exports = UserPost;
