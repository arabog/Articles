const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
          {
                    username: {
                              type: String,
                              required: true,
                              trim: true,
                    },

                    firstname: {
                              type: String,
                              required: true,
                              trim: true,
                    },

                    lastname: {
                              type: String,
                              required: true,
                              trim: true,
                    },

                    class: {
                              type: String,
                              required: true,
                              trim: true,
                    },

                    email: {
                              type: String,
                              required: true,
                              trim: true,

                              validate(value) {
                                        if (!value.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
                                                  throw new Error('Email is not valid.');
                                        }
                              }
                    },

                    password: {
                              type: String,
                              required: true,
                              trim: true,
                              minlength: 6
                    },

                    isAdmin: {
                              type: Boolean,
                              default: false,
                    }
          },

          {
                    timestamps: true
          }
);


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;