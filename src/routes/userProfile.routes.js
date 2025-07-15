const express = require('express');
const { UserInfo, UserInfoById, addUserProfile, updateUserProfile } = require('../controller/userProfile.controller');

const router = express.Router();

router.post('/myProfile/add', addUserProfile);
router.put('/myProfile/:id', updateUserProfile);
router.get('/userProfile', UserInfo);
router.get('/myProfile/:id', UserInfoById);


module.exports = router;