const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
// const { authorizeRole } = require("../middleware/authorizationMiddleware");

const { addTask, getTasks, updateTask, deleteTask, countTasks } = require("../controllers/taskController");

/**
 * @description To create categories
 * @api /api/category/create
 * @access Private
 * @type POST
 * @return response
 */

router.post("/addTask", auth,  addTask);

/**
 * @description To get all categories
 * @api /api/category/all
 * @access Public
 * @type GET
 * @return response
 */
router.get("/all", auth, getTasks);

/**
 * @description To update categories by id
 * @api /api/category/update/:id
 * @access Private
 * @type PUT
 * @return response
 */
router.patch("/update/:id", auth, updateTask);

/**
 * @description To delete categories by id
 * @api /api/task/delete/:id
 * @access Private
 * @type DELETE
 * @return response
 */
router.delete("/delete/:id", auth, deleteTask);

router.get("/count/:id", auth, countTasks);


module.exports = router;