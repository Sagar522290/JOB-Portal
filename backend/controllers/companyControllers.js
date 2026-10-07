import { Company } from "../models/companyModel.js"


// register company
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        const trimmedCompanyName = companyName?.trim();

        if (!trimmedCompanyName) {
            return res.status(400).json({
                message: "Company name required.",
                success: false
            });
        }

        const existingCompany = await Company.findOne({ name: trimmedCompanyName });
        if (existingCompany) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            });
        }

        const company = await Company.create({
            name: trimmedCompanyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while registering the company.",
            success: false
        });
    }
};

// get all companies
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while fetching companies.",
            success: false
        });
    }
};

// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while fetching company details.",
            success: false
        });
    }
};

// update company
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        // cloudnary here.....

        const updateData = { name, description, website, location };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });



        // if (name !== undefined) updateData.name = name;
        // if (description !== undefined) updateData.description = description;
        // if (website !== undefined) updateData.website = website;
        // if (location !== undefined) updateData.location = location;


        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated.",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while updating the company.",
            success: false
        });
    }
};