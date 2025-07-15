const {StatusCodes} = require('http-status-codes');
const { createTaskService, getTaskByIdService, getAllTaskService, updateTaskService, deleteTaskServices } = require('../services/db/tasks.services');
const { sendVerification} = require('../middleware/sendverificationEmail.middleware.js')
const { NotFoundError } = require('../error/error.error.js');

const createTask = async (req, res, next) => {
    try {
        const create_task = await createTaskService(req.body);
        sendVerification(create_task, res);
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
        const get_task = await getTaskByIdService(id);
        if(!get_task){
            throw NotFoundError({
                message: 'Task Id not found',
                from: 'getTask()',
                cause: error
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
        const get_all_task = await getAllTaskService();
        if(!get_all_task){
            throw NotFoundError ({
                message: 'No task found',
                from: 'getAllTask()',
                cause: error
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
        const update_task = await updateTaskService(id, req.body);
        if(!update_task){
            throw NotFoundError({
                message: 'Task Id not found',
                from: 'updateTask()',
                cause: error
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
};

const getFilteredTask = async (req, res, next) => {
    const { status, priority, dueDates } = req.query || {};
    try {

    const filter = {};

    if(status) filter.status = status;

    if(priority) filter.priority = priority;

    if(dueDates) {
        filter.dueDates = { $lte: new Date() };
    };

    const filtered_task = await getFilteredTask(filter);
    return res.status(StatusCodes.OK).json({
        success: true,
        message: 'Tasks filtered',
        data: filtered_task
    });
    } catch (error) {
        next(error);
    }
};


const deleteTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const delete_task = await deleteTaskServices(id);
        if(!delete_task){
            throw NotFoundError({
                message: 'Task Id not found',
                from: 'deleteTask()',
                cause: error
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Task deleted'
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {createTask, deleteTask, getTask, getAllTask, updateTask, getFilteredTask};