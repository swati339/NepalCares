var express = require('express');
var router = express.Router();

//const Story = require('../models/story'); 

router.get('/',function(req,res,next){
    res.render('forums',{title:'forums'});
});

router.get('/', async (req, res, next) => {
    try {
      const stories = await Story.find();
      res.render('forums', { title: 'Forums', stories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error retrieving stories' });
    }
  });
  
  // Handle story submission
  router.post('/post-story', async (req, res) => {
    try {
      const { username, content } = req.body;
      const newStory = new Story({ username, content });
      await newStory.save();
      res.redirect('/forums'); // Redirect to the forums page after submission
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error posting story' });
    }
  });



module.exports = router;


