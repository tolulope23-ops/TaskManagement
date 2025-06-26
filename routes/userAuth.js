const express = require('express');
const { userRegister, userLogin} = require('../controller/userAuth');
const { validateUserData} = require('../middleware/validation');
const { isUserAuthenticated } = require('../middleware/isAuthentication');
const { verifyEmail } = require('../middleware/sendEmail');
const router = express.Router();

router.post('/register', validateUserData, userRegister, verifyEmail);
router.post('/login', validateUserData, userLogin);
// router.delete('/deleteAccount/:id',isUserAuthenticated, deleteUserAccount);


module.exports = router;