import { Job } from "../models/jobModel.js";


// Job register for Admin
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, location, salary, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !location || !salary || !jobType || !experience || !position || !companyId) {
            return res.status(404).json({
                message: "Something is missing.",
                success: false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experience: experience,
            position,
            company: companyId,
            created_by: userId

        })
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: "Failed to create job",
            success: false
        });
    }
}

// get alljobs for student
export const getAlljobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }
        const jobs = await Job.find(query).populate("company", "name").populate("created_by", "fullname email");
        if (!jobs) {
            return res.status(400).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

// get Job Id for student
export const getJobId = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

// get all jobs for admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId })
        if (jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error);

    }
}