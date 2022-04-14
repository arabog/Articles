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


// get a particular post
router.get('/api/post/:id', async (req, res) => {
          try {
                    const article = await Article.findById(req.params.id);

                    res.status(200).json(article);
          } catch (err) {
                    res.status(500).json(err);
          }
});


// updated posts
router.put('/api/post/:id', async (req, res) => {
          if(req.body.userId === req.params.id) {
                    try {
                              const selectedArticle = await Article.findByIdAndUpdate(
                                        req.params.id,

                                        {
                                                  $set: req.body
                                        },

                                        {
                                                  new: true
                                        }
                              );
          
                              res.status(200).json(selectedArticle);
                    } catch (err) {
                              res.status(500).json(err);
                    }
          }else {
                    res.status(401).json('This post can only be updated by the author!');
          }
});



// delete a post by both admin and owner
// a post likes

// post duration before it's deleted


module.exports = router;