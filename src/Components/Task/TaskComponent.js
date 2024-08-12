import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../Config/axiosConfig";


const TaskComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ text: "" });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get("/api/task/all");
      console.log("API Response:", response.data); // Debug log
      setTasks(response.data.tasks)
      
    } catch (error) {
      //console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks");
      setTasks([]); // Ensure state is not undefined
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const response = await axiosInstance.patch(
          `/api/task/update/${editingTask._id}`,
          newTask
        );
        toast.success(response.data.msg);
        setEditingTask(null);
      } else {
        const response = await axiosInstance.post(
          "/api/task/addTask",
          newTask
        );
        toast.success(response.data.msg);
      }
      setNewTask({ text: "" });
      fetchTasks(); // Ensure we wait for tasks to be fetched
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.msg || "An error occurred");
    }
  };

  const handleEdit = (task) => {
    setNewTask({ text: task.text });
    setEditingTask(task);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/api/task/delete/${id}`
      );
      toast.success(response.data.msg);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(error.response.data.msg || "An error occurred");
    }
  };

  return (
    <div className="container mx-auto p-4 ml-80">
      <h1 className="text-2xl font-bold mb-4">Manage Tasks</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <ToastContainer />
        <div className="flex flex-col mb-2">
          <label htmlFor="text" className="mb-1">
            Add Task
          </label>
          <input
            type="text"
            name="text"
            id="text"
            value={newTask.text}
            onChange={handleInputChange}
            className="p-2 border w-1/3 border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingTask ? "Update task" : "Add task"}
        </button>
      </form>
      <div>
        <h2 className="text-xl font-semibold mb-2">Task List</h2>
        <ul>
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center border-b border-gray-300 py-2 w-1/3"
            >
              <div>
                <h3>{task.text}</h3>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(task)}
                  className="mr-2 text-blue-500"
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500"
                >
                  <AiFillDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskComponent;
