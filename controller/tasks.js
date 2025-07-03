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
        next(error);
    }
};

const getTask = async(req, res, next) => {
    const { id } = req.params;
    try {
        const get_task = await Task.findById({_id: id});
        if(!get_task){
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Task with the ID not found'
            });
        };

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Task retrieved successfully.',
            data: get_task
        });
    } catch (error) {
        next(error);
    };
};

const getAllTask = async (req, res, next) => {
    try {
        const get_all_task = await Task.find();
        if(!get_all_task){
            return res.status(StatusCodes.NOT_FOUND).json({
                success: true,
                message: 'No task managed.',
                data: get_all_task
            });
        };

        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Tasks retrieved succesfully',
            data: get_all_task
        });
    } catch (error) {
        next(error);
    };
};

const updateTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const update_task = await Task.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
         if(!update_task){
            return res.status(StatusCodes.NOT_FOUND).json({
                success: true,
                message: 'Task with the ID not found',
                data: update_task
            });
        };
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Tasks updated succesfully',
            data: update_task
        });
    } catch (error) {
        next(error);
    }
}


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
        next(error);
    }
}


module.exports = {createTask, deleteTask, getTask, getAllTask, updateTask};