const Task = require('../../model/tasks.model');

const createTaskService = async (task_data) => {
    const create_task = await Task.create(task_data);
    return create_task;
};

const getTaskByIdService = async (task_data_id) => {
    const get_task = await Task.findById({_id: task_data_id}); 
    return get_task;
};

const getAllTaskService = async () => { 
    const get_all_task = await Task.find();
    return get_all_task;
};

const updateTaskService = async (task_data_id, task_data ) => {
    const update_task = await Task.findByIdAndUpdate(task_data_id, task_data, {new: true, runValidators: true});
    return update_task;
};

const deleteTaskServices = async (task_data_id) => {
    const delete_task = await Task.findByIdAndDelete(task_data_id);
    return;
};

const getFilteredTask = async (value) =>{
    const filtered_task = await Task.find(value);
    return filtered_task;   
}

module.exports = {createTaskService, getTaskByIdService, getAllTaskService, updateTaskService, deleteTaskServices, getFilteredTask}