const express = require('express');
const router = express.Router();
const userPostController = require('../controller/userPostController');

// Middleware for authentication
router.use(userPostController.authenticate);

// Define routes for userPosts
router.post('/userPost', userPostController.createPost);
router.get('/userPosts', userPostController.getAllPosts);
router.get('/userPost/:userPostId', userPostController.getPostById);
router.put('/userPost/:userPostId', userPostController.updatePost);
router.delete('/userPost/:userPostId', userPostController.deletePost);

module.exports = router;
