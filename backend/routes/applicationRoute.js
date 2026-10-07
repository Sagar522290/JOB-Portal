import express from "express";
import isAuthentication from "../middleware/isAuthentication.js";
import { applyJob, getAppliedJobs,getApplicants, updateStatus } from "../controllers/applicationControllers.js";


const router = express.Router();

router.route("/apply/:id").get(isAuthentication, applyJob);
router.route("/get").get(isAuthentication, getAppliedJobs );
router.route("/:id/applicants").get(isAuthentication, getApplicants);
router.route("/status/:id/update").post(isAuthentication, updateStatus);

export default router;