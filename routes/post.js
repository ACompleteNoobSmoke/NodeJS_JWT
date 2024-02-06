const postsRouter = require("express").Router();
const {publicPosts, privatePosts} = require("../db");
const checkAuth = require("../middleware/checkAuth");


postsRouter.get('/public', (req, res) => {
    res.status(200).send(publicPosts);
})

postsRouter.get('/private', checkAuth, (req, res) => {

    res.status(200).send(privatePosts);
})


const userValidCheck = (req, res, next) => {
   
}


module.exports = postsRouter;