const express = require('express');
const router = express.Router();

const { createTask, deleteTask } = require('../controller/tasks');

router.post('/', createTask);
router.delete('/delete/:id', deleteTask);

module.exports = router;