const TaskModel = require('../models/TaskModel');

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
};

const addTask = async (req, res) => {
  try {
    const { text, createdDate, assignedTime, priority} = req.body;

    // Create a new task instance with the provided data
    const task = new TaskModel({
     text,
     createdDate,
     assignedTime,
     priority,
     user: req.user.id,
    });
    await task.save();

    return res
      .status(201)
      .json({ msg: "Task added successfully", task: task });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
};

// controller for updating a category
const updateTask = async (req, res) => {
  const { text, status, createdDate, assignedTime } = req.body;
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    task.text = text || task.text;
    task.status = status || task.status;
    if (createdDate) {
      task.createdDate = new Date(createdDate);
    }
    if (assignedTime) {
      const [hours, minutes] = assignedTime.split(':');
      const date = new Date();
      date.setHours(hours, minutes);
      task.assignedTime = date; // Convert to Date object
    }

    await task.save();
    return res.status(200).json({ msg: "Task updated successfully", task });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// controller for getting a Task

const getTasks = async (req, res) => {
  try {
    // use the authenticated user's id to fetch thier tasks
  const tasks = await TaskModel.find({user: req.user.id});
    return res
      .status(200)
      .json({ msg: "Task fetched successfully", tasks });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    return res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
   sendErrorResponse(res, error);
  }
};

const countTasks = async (req, res) => {
  try {
    // Count tasks for the authenticated user where status is not 'completed'
    const totalTasks = await TaskModel.countDocuments({
      user: req.user.id,
      status: { $ne: 'completed' } // Exclude tasks with status 'completed'
    });

    return res.status(200).json({ totalTasks });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};




module.exports = {addTask, deleteTask, getTasks, updateTask, countTasks};
