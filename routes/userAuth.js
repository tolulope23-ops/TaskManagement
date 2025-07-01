const express = require('express');
const { userRegister, userLogin} = require('../controller/userAuth');
const { validateUserData} = require('../middleware/validation');
const { isUserAuthenticated } = require('../middleware/isAuthentication');
const { sendVerification } = require('../utils/sendverificationEmail');
const router = express.Router();

router.post('/register', validateUserData, userRegister, sendVerification);
// router.post('/verifyEmail', verifyEmail)
router.post('/login', validateUserData, isUserAuthenticated, userLogin);
// router.delete('/deleteAccount/:id',isUserAuthenticated, deleteUserAccount);


module.exports = router;