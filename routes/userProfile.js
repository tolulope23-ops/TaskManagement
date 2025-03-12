const express = require('express');
const { UserInfo, UserInfoById } = require('../controller/userProfile');

const router = express.Router();

router.get('/userProfile', UserInfo);
router.get('/myProfile', UserInfoById);


module.exports = router;