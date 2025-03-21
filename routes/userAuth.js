const express = require('express');
const { userRegister, userLogin, deleteUserAccount } = require('../controller/userAuth');
const { validateUserData} = require('../middleware/validation');
const { isUserAuthenticated } = require('../middleware/isAuthentication');
const router = express.Router();

router.post('/register', validateUserData, userRegister);
router.post('/login', validateUserData, userLogin);
router.delete('/deleteAccount/:id',isUserAuthenticated, deleteUserAccount);


module.exports = router;