const express = require('express');
const { register, login, getUserDetails, updateUser, deleteUser } = require('../controllers/controller');
const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/user/:userId', getUserDetails);
router.put('/user/:userId', updateUser); 
router.delete('/user/:userId', deleteUser);

module.exports = router;
