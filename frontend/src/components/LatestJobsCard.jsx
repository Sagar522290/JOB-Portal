const LatestJobsCard = ({ job }) => {
    return (
        <>
            <div className="flex min-h-64 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-[#6A38C2]">{job.company?.name || 'Company Name'}</p>
                        <h1 className="mt-1 text-xl font-bold text-gray-900">{job.title}</h1>
                    </div>
                    <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">{job.position} positions</span>
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">{job.description}</p>
                <p className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                    <span aria-hidden="true">•</span>
                    {job.location}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">{job.jobType}</span>
                    {job.requirements?.slice(0, 3).map((requirement) => (
                        <span key={requirement} className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                            {requirement.trim()}
                        </span>
                    ))}
                </div>
            </div>
        </>
    )
}

export default LatestJobsCard