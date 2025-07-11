const express = require('express');
const router = express.Router();

const { createTask, deleteTask, getTask, getAllTask, updateTask } = require('../controller/tasks');

router.post('/', createTask);
router.get('/:id', getTask);
router.get('/tasks', getAllTask);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

module.exports = router;