const express = require('express');
const { register, login, getUserDetails, updateUser, deleteUser, getImage } = require('../controllers/controller');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); 
    },
  });
  
const upload = multer({ storage: storage });

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/user/:userId', getUserDetails);
router.put('/user/:userId', upload.single('profileImage'), updateUser); 
router.delete('/user/:userId', deleteUser);
router.delete('/user/:userId/image', getImage);

module.exports = router;
