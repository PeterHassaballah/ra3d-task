import { Router } from "express";
import validate from "../../middlewares/validate";
import { createTask, updateTask } from "../../validations/task";
import { auth, extractUserId } from "../../middlewares/auth";
import {
  createTask as _createTask,
  getAllTasks as _getTasks,
  getTask as _getTask,
  updateTask as _updateTask,
  getUserTasks,
  assignTask
} from "../../controllers/task";
const router = Router();
//routes to get/create tasks
router
  .route("/")
  .post(auth, validate(createTask), extractUserId, _createTask)
  .get(auth, _getTasks);
// get user's tasks
router.get('/my-tasks', auth, extractUserId, getUserTasks);
// assign task
router.patch("/:taskId/assign", auth, assignTask);
// update/get task
router
  .route("/:taskId")
  .get(auth, _getTask)
  .patch(auth, validate(updateTask), _updateTask);

//export authRoute
export default router;