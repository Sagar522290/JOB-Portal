import express from "express";
import { getProfile, login, logOut, register, updateProfile } from "../controllers/userControllers.js";
import isAuthentication from "../middleware/isAuthentication.js";
import { profileUpload, singleUpload } from "../middleware/multer.js";


const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(isAuthentication, logOut);
router.route("/profile").get(isAuthentication, getProfile);
router.route("/profile/update").post(isAuthentication, profileUpload, updateProfile);

export default router;