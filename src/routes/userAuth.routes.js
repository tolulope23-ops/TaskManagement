const express = require('express');
const router = express.Router();

const { userRegister, userLogin} = require('../controller/userAuth.controller');
const { validateUserData} = require('../middleware/validation.middleware');
const { isUserAuthenticated } = require('../middleware/isAuthentication.middleware');
const { sendVerification } = require('../middleware/sendverificationEmail.middleware');
const { verifyUserEmail } = require('../middleware/verifyEmail.middleware');


router.post('/register', validateUserData, userRegister, sendVerification);
router.post('/verifyEmail', verifyUserEmail);
// router.post('/resendOTP', sendVerification);
router.post('/login', validateUserData, isUserAuthenticated, userLogin);
// router.delete('/deleteAccount/:id',isUserAuthenticated, deleteUserAccount);


module.exports = router;