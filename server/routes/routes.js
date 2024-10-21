const express = require('express');
const { register, login, getUserDetails } = require('../controllers/controller');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user/:userId', getUserDetails);

module.exports = router;
