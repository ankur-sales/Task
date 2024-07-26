const UserPost = require('../model/userPostModel');
const { validateUserPost } = require('../utils/validation');

exports.createPost = async (userPostData) => {
    try {

        const valid = validateUserPost(userPostData);
        if (!valid) {
            return { status: 400, error: 'Invalid data' };
        }

        const userPost = new UserPost(userPostData);
        await userPost.save();
        return { status: 201, userPost };
    } catch (error) {
        return { status: 500, error: `Error creating Post: ${error.message}` };
    }
};

exports.getAllPosts = async () => {
    try {
        // const userPosts = await UserPost.find().populate('user_id');
        const userPosts = await UserPost.find();

        return { status: 200, userPosts };
    } catch (error) {
        return { status: 500, error: `Error fetching Posts: ${error.message}` };
    }
};

exports.getPostById = async (postId) => {
    try {
        
        const post = await UserPost.findById(postId);

        if (!post) {
            return { status: 404, error: 'Post not found' };
        }
        return { status: 200, post };
    } catch (error) {
        return { status: 500, error: `Error fetching post: ${error.message}` };
    }
};

exports.updatePost = async (userPostId, updates) => {
    try {

        const valid = validateUserPost(updates);
        if (!valid) {
            return { status: 400, error: 'Invalid data' };
        }

        const userPost = await UserPost.findByIdAndUpdate(userPostId, updates, { new: true });
        if (!userPost) {
            return { status: 404, error: 'Post not found' };
        }
        return { status: 200, userPost };
    } catch (error) {
        return { status: 500, error: `Error updating Post: ${error.message}` };
    }
};

exports.deletePost = async (userPostId) => {
    try {
        const userPost = await UserPost.findByIdAndDelete(userPostId);
        if (!userPost) {
            return { status: 404, error: 'Post not found' };
        }
        return { status: 200, message: 'Post deleted successfully' };
    } catch (error) {
        return { status: 500, error: `Error deleting Post: ${error.message}` };
    }
};
