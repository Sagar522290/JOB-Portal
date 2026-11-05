import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const missingConfig = ["CLOUD_NAME", "API_KEY", "API_SECRET"]
    .filter((name) => !process.env[name]);

if (missingConfig.length > 0) {
    console.error(`Missing Cloudinary environment variables: ${missingConfig.join(", ")}`);
}

export default cloudinary;