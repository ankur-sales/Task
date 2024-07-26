const userPostService = require('../services/userPostService');

// Middleware for authentication
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ error: 'No token provided.' });

    next();
};

exports.createPost = async (req, res) => {
    try {
        const userPostData = req.body;


        const result = await userPostService.createPost(userPostData);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

exports.getAllPosts = async (req, res) => {
    try {

        const result = await userPostService.getAllPosts();
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const { userPostId } = req.params;

        const result = await userPostService.getPostById(userPostId);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { userPostId } = req.params;
        const updates = req.body;

        const result = await userPostService.updatePost(userPostId, updates);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { userPostId } = req.params;

        const result = await userPostService.deletePost(userPostId);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

exports.authenticate = authenticate;
