import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/userController.js";
import { registerSchema, loginSchema } from "../validations/userValidation.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/logout", logoutUser);

export default router;