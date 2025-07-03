// NB: Proper error handling
const {StatusCodes} = require('http-status-codes');
const Task = require('../model/tasks');

const createTask = async (req, res, next) => {
    try {
        const create_task = await Task.create(req.body);
        return res.status(StatusCodes.CREATED).json({
            sucess: true,
            message: 'Task(s) created successfuly',
            data: create_task
        });
    } catch (error) {
        next(error)
    }
};


const deleteTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const delete_task = await Task.findByIdAndDelete(id);
        if(!delete_task){
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Task with the ID not found'
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Task deleted'
        });
    } catch (error) {
        next(error)
    }
}


module.exports = {createTask, deleteTask};