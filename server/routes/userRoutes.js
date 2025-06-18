const express= require('express');
const userController = require('../controllers/usersController.js');
const router= express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/setAvatar/:id',userController.setAvatar);
router.get('/allUsers/:id', userController.allUsers);

module.exports=router;