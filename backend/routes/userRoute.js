import express from "express";
import { login, logOut, register, updateProfile } from "../controllers/userControllers.js";
import isAuthentication from "../middleware/isAuthentication.js";


const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isAuthentication, logOut);
router.route("/profile/update").post(isAuthentication, updateProfile);

export default router;