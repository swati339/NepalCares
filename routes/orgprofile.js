var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('orgprofile',{title:'organisational profile'});
});



module.exports = router;


