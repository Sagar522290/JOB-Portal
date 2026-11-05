import React, { useMemo, useState } from 'react'
import Navbar from './Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs'

const Jobs = () => {
    useGetAllJobs()
    const jobs = useSelector((store) => store.job.allJobs)
    const loading = useSelector((store) => store.job.loading)
    const [location, setLocation] = useState('')
    const [jobTypes, setJobTypes] = useState([])

    const filteredJobs = useMemo(() => {
        const normalizedLocation = location.toLowerCase()
        return jobs.filter(Boolean).filter((job) => {
            const jobLocation = String(job.location || '').toLowerCase()
            const jobType = String(job.jobType || '').toLowerCase().replace(/[\s_-]/g, '')
            const locationMatches = !location ||
                location === 'India' && jobLocation.includes('india') ||
                location === 'Remote' && (jobLocation.includes('remote') || jobType.includes('remote')) ||
                location === 'Bangalore' && jobLocation.includes('bangalore') ||
                jobLocation.includes(normalizedLocation)

            const typeMatches = jobTypes.length === 0 || jobTypes.some((type) =>
                jobType.includes(type.toLowerCase().replace(/[\s_-]/g, ''))
            )
            return locationMatches && typeMatches
        })
    }, [jobs, location, jobTypes])

    const toggleJobType = (type) => {
        setJobTypes((current) => current.includes(type)
            ? current.filter((item) => item !== type)
            : [...current, type])
    }

    const clearFilters = () => {
        setLocation('')
        setJobTypes([])
    }

    return (
        <>
            <Navbar />
            {/* filter Page*/}
            <div className='mx-auto flex w-full max-w-[1500px] flex-col gap-5 px-3 py-5 sm:px-4 sm:py-8 lg:flex-row lg:gap-6 lg:px-6'>
                <aside className='w-full shrink-0 lg:w-72'>
                    <FilterCard
                        location={location}
                        onLocationChange={setLocation}
                        jobTypes={jobTypes}
                        onJobTypeChange={toggleJobType}
                        onClear={clearFilters}
                    />
                </aside>
                {loading ? (
                    <div className='flex min-h-48 flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500'>Loading jobs...</div>
                ) : filteredJobs.length === 0 ? (
                    <div className='flex min-h-48 flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500'>Jobs Not Found!</div>
                ) : (
                    <section className='min-w-0 flex-1'>
                        <div className='mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end'>
                            <div>
                                <p className='text-sm font-medium text-[#6A38C2]'>{filteredJobs.length} opportunities</p>
                                <h1 className='mt-1 text-2xl font-bold text-gray-900'>Available Jobs</h1>
                            </div>
                            <select className='w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 sm:w-auto'>
                                <option>Newest first</option>
                                <option>Most relevant</option>
                            </select>
                        </div>
                        <div className='grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3'>
                        {filteredJobs.map((job) => <Job key={job._id || job.id} job={job} />)}
                        </div>
                    </section>
                )}
            </div>
        </>
    )
}

export default Jobs