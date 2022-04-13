const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
          {
                    title: {
                              type: String,
                              required: true,
                              unique: true,
                    },

                    desc: {
                              type: String,
                              required: true,
                    },

                    photo: {
                              type: String,
                              required: false,
                    },

                    author: {
                              type: String,
                              required: true,
                              unique: true
                    },

                    categories: {
                              type: Array,
                              required: false,
                              unique: false,
                    },

                    likes: {
                              type: Array,
                              required: false,
                    }
          },

          {
                    timestamps: true
          }
);


const Articles = mongoose.model('Articles', articleSchema);

module.exports = Articles;