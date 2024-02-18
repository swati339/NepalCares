// models/story.js

const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  username: String,
  content: String,
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
