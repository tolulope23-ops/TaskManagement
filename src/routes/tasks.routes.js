const express = require('express');
const router = express.Router();

const {createTask, deleteTask, getTask, getAllTask, updateTask , getFilteredTask } = require('../controller/tasks.controller');

router.post('/', createTask);
router.get('/:id', getTask);
router.get('/tasks', getAllTask);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);
router.get('/', getFilteredTask);

module.exports = router;