import mongoose from "mongoose";
import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";

//   Create a new application
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job is required",
                success: false
            })
        }
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            });
        }
        // check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }
        // create a new application
        const application = await Application.create({
            job: jobId,
            applicant: userId
        });
        job.applications.push(application._id);
        await job.save();
        return res.status(201).json({
            message: "Application submitted successfully.",
            application,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error occurred while submitting application.",
            success: false
        });
    }
};

// Get all applications for a specific job
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }

        });
        if (!application) {
            return res.status(404).json({
                message: "No applications found.",
                success: false
            })
        }
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Get all applications for a specific job by company
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId)
            .populate({
                path: "applications",
                populate: {
                    path: "applicant",
                    select: "fullname email phoneNumber"
                }
            });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.log("getApplicants error:", error);

        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


// Update application status
export const updateStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;
        const normalizedStatus = typeof status === "string" ? status.trim().toLowerCase() : "";
        const validStatuses = ["pending", "accepted", "rejected"];

        if (!normalizedStatus) {
            return res.status(400).json({
                message: "Status is required.",
                success: false
            });
        }

        if (!validStatuses.includes(normalizedStatus)) {
            return res.status(400).json({
                message: "Invalid application status.",
                success: false
            });
        }

        if (!mongoose.Types.ObjectId.isValid(applicationId)) {
            return res.status(400).json({
                message: "Invalid application ID.",
                success: false
            });
        }

        const application = await Application.findOne({ _id: applicationId });

        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        application.status = normalizedStatus;
        await application.save();

        return res.status(200).json({
            message: "Application status updated successfully.",
            application,
            success: true
        });

    } catch (error) {
        console.log("updateApplicationStatus error:", error);

        return res.status(500).json({
            message: "Error occurred while updating application status.",
            success: false
        });
    }
};


