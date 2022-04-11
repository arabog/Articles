const express = require('express');
const Student = require('../models/Students');
const bcrypt = require('bcryptjs');
const router = express.Router();


// get all students
router.get('/api/students', async(req, res) => {
          try {
                    const students = await Student.find();
                    
                    res.status(200).send(students);
          } catch (err) {
                    res.send(500).send('Something went wrong. Try again')
                    console.log(err);
          }
});


// get a particular student
router.get('/api/students/:id', async (req, res) => {
          try {
                    const student = await Student.findById(req.params.id);
          
                    res.status(200).send(student);
          } catch (err) {
                    res.status(500).send('Something went wrong. Try again');
                    console.log(err)
          }
})


// update a student account as d owner
router.put('/api/students/:id', async (req, res) => {
          if(req.body.userId === req.params.id) {
                    if(req.body.password) {
                              // const salt = await bcrypt.genSalt(10);

                              req.body.password = await bcrypt.hash(req.body.password, 10)
                    }


                    try {
                              const updatedStudent = await Student.findByIdAndUpdate(
                                        req.params.id,

                                        {
                                                  $set: req.body
                                        },

                                        {
                                                  new: true
                                        }
                              )

                              res.status(200).json(updatedStudent);

                    } catch (err) {
                              res.status(500).json(err)
                    }
          }else {
                    res.status(401).json("You can update only your account!");
          }
})


// delete student by admin






module.exports = router;