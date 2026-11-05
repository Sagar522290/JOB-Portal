import Navbar from "./Navbar";

import { Button } from "./ui/button";

import {
    MapPin,
    Briefcase,
    IndianRupee,
    Clock,
    Calendar,
    Building2,
    Bookmark,
    Share2,
    CheckCircle2,
    Globe,
    Users,
} from "lucide-react";
import { useParams } from "react-router-dom";
import useGetSingleJob from "../hooks/useGetSingleJob";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import toast from "react-hot-toast";

const JobDescription = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const [isApplying, setIsApplying] = useState(false);
    const jobId = params.id;
    useGetSingleJob(jobId)
    const job = useSelector((store) => store.job.singleJob);
    const user = useSelector((store) => store.auth.user);

    if (!job) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <p className="py-20 text-center text-gray-500">Loading job details...</p>
            </div>
        )
    }

    const requirements = job.requirements || [];
    const isApplied = (job.applications || []).some((application) => {
        const applicantId = application.applicant?._id || application.applicant;
        return applicantId === user?._id;
    });

    const applyForJob = async () => {
        if (!jobId || isApplied || isApplying) return;

        try {
            setIsApplying(true);
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setSingleJob({
                    ...job,
                    applications: [
                        ...(job.applications || []),
                        { applicant: user?._id }
                    ]
                }));
                toast.success(res.data.message || "Job application submitted successfully.");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to apply for this job.");
        } finally {
            setIsApplying(false);
        }
    };
    const postedDate = job.createdAt
        ? new Date(job.createdAt).toLocaleDateString()
        : "Not available";

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Job Header */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">

                    <div className="flex flex-col md:flex-row justify-between gap-6">

                        <div className="flex gap-5">

                            {/* Company Logo */}
                            <div className="h-20 w-20 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                                <Building2 className="h-10 w-10 text-[#6A38C2]" />
                            </div>

                            {/* Job Information */}
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    {job.title}
                                </h1>

                                <p className="text-gray-600 mt-2 font-medium">
                                    {job.company?.name || "Company Name"}
                                </p>

                                <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">

                                    <span className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        {job.location}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <Briefcase size={16} />
                                        {job.jobType}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <Clock size={16} />
                                        {job.experience}
                                    </span>

                                </div>
                            </div>

                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">

                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full"
                            >
                                <Bookmark size={18} />
                            </Button>

                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full"
                            >
                                <Share2 size={18} />
                            </Button>

                            <Button onClick={applyForJob} disabled={isApplied || isApplying} className={isApplied ? 'bg-green-600 px-8 rounded-lg cursor-not-allowed' : 'bg-[#6A38C2] hover:bg-[#5529a6] px-8 rounded-lg'}>
                                {isApplied ? 'Already Applied' : isApplying ? 'Applying...' : 'Apply Now'}
                            </Button>

                        </div>
                    </div>

                    <div className="border-t mt-7 pt-6 flex flex-wrap gap-8">

                        <div>
                            <p className="text-sm text-gray-500">Salary</p>
                            <h3 className="font-bold text-lg flex items-center mt-1">
                                <IndianRupee size={18} />
                                {job.salary}
                            </h3>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Job Type</p>
                            <h3 className="font-bold text-lg mt-1">{job.jobType}</h3>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Experience</p>
                            <h3 className="font-bold text-lg mt-1">{job.experience}</h3>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Posted Date</p>
                            <h3 className="font-bold text-lg mt-1">3 Days Ago</h3>
                        </div>

                    </div>

                </div>


                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-7">

                    {/* Left Section */}
                    <div className="lg:col-span-2 space-y-7">

                        {/* Job Description */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Job Description
                            </h2>

                            <p className="text-gray-600 leading-7">
                                {job.description}
                            </p>

                        </div>


                        {/* Responsibilities */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                            <h2 className="text-xl font-bold text-gray-900 mb-5">
                                Key Responsibilities
                            </h2>

                            <div className="space-y-4">

                                {requirements.length > 0 ? requirements.map((item, index) => (
                                    <div key={index} className="flex gap-3">

                                        <CheckCircle2
                                            size={20}
                                            className="text-green-500 shrink-0 mt-1"
                                        />

                                        <p className="text-gray-600 leading-6">
                                            {item}
                                        </p>

                                    </div>
                                )) : (
                                    <p className="text-gray-600">No responsibilities listed.</p>
                                )}

                            </div>

                        </div>


                        {/* Qualifications */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                            <h2 className="text-xl font-bold text-gray-900 mb-5">
                                Requirements & Qualifications
                            </h2>

                            <div className="space-y-4">

                                {requirements.length > 0 ? requirements.map((item, index) => (
                                    <div key={index} className="flex gap-3">

                                        <CheckCircle2
                                            size={20}
                                            className="text-[#6A38C2] shrink-0 mt-1"
                                        />

                                        <p className="text-gray-600 leading-6">
                                            {item}
                                        </p>

                                    </div>
                                )) : (
                                    <p className="text-gray-600">No qualifications listed.</p>
                                )}

                            </div>

                        </div>


                        {/* Required Skills */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                            <h2 className="text-xl font-bold text-gray-900 mb-5">
                                Required Skills
                            </h2>

                            <div className="flex flex-wrap gap-3">

                                {requirements.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 rounded-full bg-purple-50 text-[#6A38C2] border border-purple-100 text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}

                            </div>

                        </div>

                    </div>


                    {/* Right Sidebar */}
                    <div className="space-y-6">

                        {/* Job Overview */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                Job Overview
                            </h2>

                            <div className="space-y-6">

                                <div className="flex items-center gap-4">
                                    <div className="bg-purple-50 p-3 rounded-xl">
                                        <Briefcase className="text-[#6A38C2]" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Job Role</p>
                                        <h3 className="font-semibold">{job.title}</h3>
                                    </div>
                                </div>


                                <div className="flex items-center gap-4">
                                    <div className="bg-purple-50 p-3 rounded-xl">
                                        <MapPin className="text-[#6A38C2]" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <h3 className="font-semibold">{job.location}</h3>
                                    </div>
                                </div>


                                <div className="flex items-center gap-4">
                                    <div className="bg-purple-50 p-3 rounded-xl">
                                        <Calendar className="text-[#6A38C2]" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Posted</p>
                                        <h3 className="font-semibold">{postedDate}</h3>
                                    </div>
                                </div>


                                <div className="flex items-center gap-4">
                                    <div className="bg-purple-50 p-3 rounded-xl">
                                        <Users className="text-[#6A38C2]" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Vacancies</p>
                                        <h3 className="font-semibold">{job.position} positions</h3>
                                    </div>
                                </div>


                                <div className="flex items-center gap-4">
                                    <div className="bg-purple-50 p-3 rounded-xl">
                                        <Globe className="text-[#6A38C2]" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Work Mode</p>
                                        <h3 className="font-semibold">{job.jobType}</h3>
                                    </div>
                                </div>

                            </div>

                            <Button onClick={applyForJob} disabled={isApplied || isApplying} className="w-full mt-8 bg-[#6A38C2] hover:bg-[#5529a6] rounded-full disabled:cursor-not-allowed disabled:opacity-60">
                                {isApplied ? 'Already Applied' : isApplying ? 'Applying...' : 'Apply For This Job'}
                            </Button>

                        </div>


                        {/* Company Information */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                About Company
                            </h2>

                            <h3 className="text-lg font-bold text-gray-800">
                                {job.company?.name || "Company Name"}
                            </h3>

                            <p className="text-gray-600 text-sm leading-6 mt-3">
                                {job.company?.description || "Company details are not available."}
                            </p>

                            <Button
                                variant="outline"
                                className="w-full mt-5 rounded-full"
                            >
                                View Company
                            </Button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default JobDescription;
