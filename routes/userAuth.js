const express = require('express');
const { userRegister, userLogin, deleteUserAccount } = require('../controller/userAuth');
const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.delete('/deleteAccount/:id', deleteUserAccount);


module.exports = router;