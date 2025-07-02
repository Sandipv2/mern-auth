import { Router } from "express";
import authController from '../controllers/authController.js'
import userAuth from "../middlewares/userAuth.js";

const authRouter = Router();

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)
authRouter.post('/send-verify-otp', userAuth, authController.sendVerifyOtp)
authRouter.post('/verify-account', userAuth, authController.verifyEmail)
authRouter.get('/is-auth', userAuth, authController.isAuthenticated)
authRouter.post('/send-reset-otp', authController.sendResetOtp)
authRouter.post('/reset-password', authController.resetPassword)

export default authRouter
