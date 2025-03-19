const express = require('express');
const { userRegister, userLogin, deleteUserAccount } = require('../controller/userAuth');
const { validateUserData} = require('../middleware/validation');
const router = express.Router();

router.post('/register', validateUserData, userRegister);
router.post('/login', validateUserData, userLogin);
router.delete('/deleteAccount/:id', deleteUserAccount);


module.exports = router;