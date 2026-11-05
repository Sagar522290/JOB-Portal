// import { Badge } from 'lucide-react'
// import React from 'react'

// const AppliedJobTable = () => {
//   return (
//     <>
//     <Table>
//         <TableCaption>A list of your applied jobs</TableCaption>
//         <TableHeader>
//             <TableRow>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Job role</TableHead>
//                 <TableHead>Company</TableHead>
//                 <TableHead>Staus</TableHead>
//                 <TableHead>Date</TableHead>

//             </TableRow>
//         </TableHeader>
//         <TableBody>
//             {
//                 [1,2,3,4].map((item, index)=>{
//                     <TableRow key={index}>
//                         <TableCell>03-11-2026</TableCell>
//                         <TableCell>Full-Stack Developer</TableCell>
//                         <TableCell><Badge>Selected</Badge></TableCell>
//                     </TableRow>
//                 })
//             }
//         </TableBody>
//     </Table>
//     </>
//   )
// }

// export default AppliedJobTable



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

import { Button } from "./ui/button";
import Navbar from "./Navbar";
import { APPLICATION_API_END_POINT } from "../utils/constant";

const AppliedJobTable = () => {
    const navigate = useNavigate();
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    withCredentials: true
                });
                setAppliedJobs(response.data.application || []);
            } catch (error) {
                console.log(error);
                setAppliedJobs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAppliedJobs();
    }, []);

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "accepted":
                return "bg-green-100 text-green-700";

            case "rejected":
                return "bg-red-100 text-red-700";

            case "pending":
                return "bg-yellow-100 text-yellow-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <>
            <Navbar />
            <div className="mx-4 my-8 md:mx-auto md:max-w-6xl bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {/* Heading */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Applied Jobs
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Track all your job applications and their status.
                    </p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">

                    <Table>

                        <TableCaption>
                            A list of your recent job applications.
                        </TableCaption>

                        <TableHeader>
                            <TableRow className="bg-gray-50">

                                <TableHead className="font-semibold">
                                    Date
                                </TableHead>

                                <TableHead className="font-semibold">
                                    Job Role
                                </TableHead>

                                <TableHead className="font-semibold">
                                    Company
                                </TableHead>

                                <TableHead className="font-semibold">
                                    Status
                                </TableHead>

                                <TableHead className="text-right font-semibold">
                                    Action
                                </TableHead>

                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-gray-500">
                                        Loading applications...
                                    </TableCell>
                                </TableRow>
                            ) : appliedJobs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-gray-500">
                                        No applied jobs found.
                                    </TableCell>
                                </TableRow>
                            ) : appliedJobs.map((application) => (
                                <TableRow key={application._id} className="hover:bg-gray-50 transition">

                                    <TableCell className="text-gray-600 whitespace-nowrap">
                                        {application.createdAt
                                            ? new Date(application.createdAt).toLocaleDateString()
                                            : "-"}
                                    </TableCell>

                                    <TableCell className="font-medium text-gray-800">
                                        {application.job?.title || "Job unavailable"}
                                    </TableCell>

                                    <TableCell className="text-gray-600">
                                        {application.job?.company?.name || "Company unavailable"}
                                    </TableCell>

                                    <TableCell>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(application.status)}`}
                                        >
                                            {application.status
                                                ? application.status.charAt(0).toUpperCase() + application.status.slice(1)
                                                : "Pending"}
                                        </span>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="rounded-full hover:bg-[#F83002] hover:text-white hover:border-[#F83002]"
                                            disabled={!application.job?._id}
                                            onClick={() => navigate(`/description/${application.job._id}`)}
                                        >
                                            View Details
                                        </Button>
                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </div>

            </div>
        </>
    );
};

export default AppliedJobTable;