import express from "express";
import { registerUser, loginUser, logoutUser, isAuthenticated } from "../controllers/userController.js";
import { registerSchema, loginSchema } from "../validations/userValidation.js";
import validate from "../middlewares/validate.js";
import isLoggedIn from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/logout", isLoggedIn, logoutUser);
router.get("/is-auth", isLoggedIn,  isAuthenticated);

export default router;