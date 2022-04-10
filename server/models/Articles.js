const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
          {

          },

          {
                    timestamps: true
          }
);


const Articles = mongoose.model('Articles', articleSchema);

module.exports = Articles;