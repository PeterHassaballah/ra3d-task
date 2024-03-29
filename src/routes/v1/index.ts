import { Router } from "express";
import authRoute from './auth';
import userRoute from './users';
import taskRoute from './tasks';
const router = Router();
const defaultRoutes=[{
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/task",
    route: taskRoute,
  },
  {
    path: "/users",
    route: userRoute,
  }];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
// export default router;
export { router as indexRoute };