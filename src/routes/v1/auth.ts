import { Router } from "express";
import validate from "../../middlewares/validate";
import {
  register,
  login,
  logout
} from "../../validations/auth";

import {
  register as _register,
  login as _login,
  logout as _logout,
} from "../../controllers/auth";

const router= Router();
//routes

router.post("/register", validate(register), _register);
router.post("/login", validate(login), _login);
router.post("/logout", validate(logout), _logout);
// todo add login and log out with validations
//export authRoute
export default router;