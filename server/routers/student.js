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

// delete student by admin






module.exports = router;