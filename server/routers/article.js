const express = require('express');
const Article = require('../models/Articles');
const router = express.Router();


// create a post
router.post('/api/post', async (req, res) => {
          try {
                    const post = await new Article(req.body);

                    const savedPost = await post.save();

                    res.status(200).json(post);
          } catch (err) {
                    res.status(500).json(err)
          }
});


// get all posts
router.get('/api/posts', async (req, res) => {
          try {
                    const posts = await Article.find();

                    res.status(200).json(posts);
          } catch (err) {
                    res.status(500).json(err);
                    // console.log(err);
          }
})





module.exports = router;