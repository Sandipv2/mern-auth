import { Router } from "express";
import userController from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";

const userRouter = Router();

userRouter.get("/users", userController.getAllUsers);
userRouter.post("/delete", userAuth, userController.deleteUser);
userRouter.get("/data", userAuth, userController.getUserData);

export default userRouter;
