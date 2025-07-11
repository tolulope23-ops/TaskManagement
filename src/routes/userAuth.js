const express = require('express');
const router = express.Router();

const { userRegister, userLogin} = require('../controller/userAuth');
const { validateUserData} = require('../middleware/validation');
const { isUserAuthenticated } = require('../middleware/isAuthentication');
const { sendVerification } = require('../utils/sendverificationEmail');
const { verifyUserEmail } = require('../middleware/verifyEmail');


router.post('/register', validateUserData, userRegister, sendVerification);
router.post('/verifyEmail', verifyUserEmail);
router.post('/resendOTP', sendVerification);
router.post('/login', validateUserData, isUserAuthenticated, userLogin);
// router.delete('/deleteAccount/:id',isUserAuthenticated, deleteUserAccount);


module.exports = router;