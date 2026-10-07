import { User } from '../models/userModel.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, passwoard, role } = req.body;
        const inputPassword = password || passwoard;

        if (!fullname || !email || !phoneNumber || !inputPassword || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email.",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(inputPassword, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        })
        return res.status(201).json({
            message: "Account was created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

// Login
export const login = async (req, res) => {
    try {
        const { email, password, passwoard, role } = req.body;
        const inputPassword = password || passwoard;

        if (!email || !inputPassword || !role) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(inputPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            })
        }
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        }
        const tokenData = {
            userId: user._id
        }


        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`, user,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

// LogOut
export const logOut = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

// Update Profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        const userId = req.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found!",
                success: false
            })
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    message: "Email already in use.",
                    success: false
                })
            }
        }

        if (!user.profile) {
            user.profile = {};
        }

        const skillsArray = Array.isArray(skills)
            ? skills.map(skill => skill.trim()).filter(Boolean)
            : typeof skills === "string"
                ? skills.split(",").map(skill => skill.trim()).filter(Boolean)
                : user.profile.skills || [];

        // updating data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio !== undefined) user.profile.bio = bio;
        if (skills !== undefined) user.profile.skills = skillsArray;

        // resume comes here...

        await user.save();

        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            success: true,
            user: updatedUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while updating profile.",
            success: false
        })
    }
}

