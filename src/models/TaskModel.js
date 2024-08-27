const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        maxlength: 500
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    assignedTime: {
        type: Date,
    },

    priority: {
        type: String
    }
    // category: { 
    //     type: String, 
    //     enum: ['Personal', 'Study', 'Work', 'Health', 'Household', 'Social', 'Financial', 'Goals', 'Projects', 'Travel'],
    //      required: true
    // }

});
const TaskModel = mongoose.model('Task', taskSchema);
module.exports = TaskModel;