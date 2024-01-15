const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  // Define other attributes like user_id, timestamps, etc.
}, {
  sequelize
});

module.exports = Post;
