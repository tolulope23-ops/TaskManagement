const {StatusCodes} = require('http-status-codes');
const Task = require('../model/tasks');

const createTask = async (req, res, next) => {
    try {
        const create_task = await Task.create(req.body);
        res.status(StatusCodes.CREATED).json({
            sucess: true,
            message: 'Task(s) created successfuly',
            data: create_task
        });
    } catch (error) {
        next(error)
    }
};






module.exports = {createTask};