const express= require('express');
const messagesController = require('../controllers/messagesController.js');
const router= express.Router();

router.post('/addmsg/', messagesController.addMessage);
router.post('/getmsg/', messagesController.getAllMessage);

module.exports=router;