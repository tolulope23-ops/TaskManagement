const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status:{
        type: String,
        enum: ['notStarted', 'inProgress', 'completed'],
        default: 'notStarted'
    },

    priority:{
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },

    dueDates: {
        type: Date,
        set: (val) => {
            const date = new Date(val);
            date.setUTCHours(0, 0, 0, 0);
            return date;
        },
        required: true
    },

    subtasks: [
        {
            title: String,
            description: String,
            isCompleted: Boolean,
        }
    ],
},
    {
        timestamps: true
    }
);

const task = mongoose.model('tasks', taskSchema);

module.exports = task;