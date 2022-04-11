const express = require('express');
const Student = require('../models/Students');
const bcrypt = require('bcryptjs');
const router = express.Router();


router.post('/register', async (req, res) => {
          const { email, password } = req.body;
          let user = await Student.findOne({email: email});

          if(user) {
                    return res.status(400).send('User with the provided email already exist');
          }

          try {
                    user = new Student(req.body);

                    user.password = await bcrypt.hash(password, 10);

                    await user.save();
                    
                    res.status(200).send("New user successfully created");
          } catch (err) {
                    res.status(500).send('Something went wrong');
                    console.log(err);
          }
});


router.post('/login', async (req, res) => {
          try {
                    const user = await Student.findOne({email: req.body.email});
                    if(!user) {
                              return res.status(400).send('User with the provided email does not exist');
                    }

                    const isUser = await bcrypt.compare(req.body.password, user.password);
                    if(!isUser) {
                              return res.status('Invalid password');
                    }
                    
                    const {password, ...rest} = user.toObject();
                    // const { password, ...others } = user._doc

                    return res.send(rest);
          } catch (err) {
                    return res.status(500).send('Something weng wrong. Try again');
          }
})


module.exports = router;