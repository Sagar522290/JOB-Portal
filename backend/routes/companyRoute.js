import express from "express";
import isAuthentication from "../middleware/isAuthentication.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/companyControllers.js";


const router = express.Router();

router.route("/register").post(isAuthentication, registerCompany);
router.route("/get").get(isAuthentication, getCompany);
router.route("/get/:id").get(isAuthentication, getCompanyById);
router.route("/update/:id").put(isAuthentication, updateCompany);

export default router;