const express = require('express');
const Article = require('../models/Articles');
const router = express.Router();
const Student = require('../models/Students')


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
router.delete('/api/post/:id', async (req, res) => {
          const user = await Article.findById(req.body.userId);

          if((req.body.userId === req.params.id) || user.isAdmin) {
                    try {
                              await Article.findByIdAndDelete(req.params.id);

                              res.status(200).json('Article has been deleted...');
                    } catch (err) {
                              res.status(500).json(err);
                    }
          }else {
                    res.status(401).json('You can delete only your post, unless you are admin');
          }
});


// a post likes
// router.get('/api/post/likes/update', async (req, res) => {
//           const post = await Article.findById(req.body.postId);
//           const student = await Student.findById(req.body.userId);

//           let totalLikes;
          
//           try {
//                     if((post.likes.includes(student._id))) {
//                               totalLikes.filter((article) => article.likes !== student._id);
                              
//                     }else {
//                               totalLikes = post['likes'].push(student._id);
//                     }


//                     res.status(200).json(totalLikes);
//                     console.log(totalLikes)
//           } catch (err) {
//                     res.status(500).json(err);
//                     console.log(err);
//           }
// })

// post duration before it's deleted


module.exports = router;