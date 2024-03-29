import { Router } from "express";
import validate from "../../middlewares/validate";
import { createTask,updateTask } from "../../validations/task";
import {
  createTask as _createTask,
  getAllTasks as _getTasks,
  getTask as _getTask,
  updateTask as _updateTask,
} from "../../controllers/task"; 
const router = Router();
//routes
router
  .route("/")
  .post(validate(createTask), _createTask)
  .get( _getTasks);
// uploading json to create tasks
router
  .route("/:taskId")
  .get( _getTask)
  .patch(validate(updateTask), _updateTask);

//export authRoute
export default router;