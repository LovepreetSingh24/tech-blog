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

// ... Post model definition ...

Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  
  module.exports = Post;
  