import express from "express";
import isAuthentication from "../middleware/isAuthentication.js";
import { getAdminJobs, getAlljobs, getJobId, postJob } from "../controllers/jobControllers.js";


const router = express.Router();

router.route('/post').post(isAuthentication, postJob);
router.route('/get').get(isAuthentication, getAlljobs);
router.route("/getadminjobs").get(isAuthentication, getAdminJobs);
router.route('/get/:id').get(isAuthentication, getJobId);

export default router;