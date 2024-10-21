const express = require('express');
const { register, login, getUserDetails } = require('../controllers/controller');
const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/user/:userId', getUserDetails);

module.exports = router;
