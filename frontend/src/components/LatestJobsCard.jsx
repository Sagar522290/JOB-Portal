import React from 'react'

const LatestJobsCard = () => {
    return (
        <>
            <div className="flex min-h-64 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-[#6A38C2]">Company Name</p>
                        <h1 className="mt-1 text-xl font-bold text-gray-900">Job Title</h1>
                    </div>
                    <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">12 positions</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                    <span aria-hidden="true">•</span>
                    Location
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">Full Time</span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">Part Time</span>
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">Remote</span>
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">Frontend</span>
                </div>
            </div>
        </>
    )
}

export default LatestJobsCard