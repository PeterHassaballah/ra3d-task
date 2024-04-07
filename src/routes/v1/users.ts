import { Router } from "express";
import validate from "../../middlewares/validate";
import multer from 'multer';
import { createUser, getUsers, getUser, updateUser, } from "../../validations/user";
import { auth,extractUserId } from "../../middlewares/auth";
import {
  createUser as _createUser,
  getUsers as _getUsers,
  getUser as _getUser,
  updateUser as _updateUser,
  createFromJson,
  getUserNotifications
} from "../../controllers/user";
const upload = multer({   storage: multer.memoryStorage(),}); 
const router = Router();
//routes
router
  .route("/")
  .post(validate(createUser), _createUser)
  .get(validate(getUsers), _getUsers);
// uploading json to create users
router.post('/uploadUsers',upload.single('users'), createFromJson);

router.get('/:userId/notification',auth,extractUserId, getUserNotifications);
router
  .route("/:userId")
  .get(validate(getUser), _getUser)
  .patch(validate(updateUser), _updateUser);

//export authRoute
export default router;