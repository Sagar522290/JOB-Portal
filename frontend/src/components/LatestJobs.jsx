import React from 'react'
import LatestJobsCard from './LatestJobsCard'

const LatestJobs = () => {

  const jobIds = [1, 2, 3, 4, 5, 6]

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-left">
          <h1 className="text-3xl font-bold text-gray-900">Latest & Top <span className="text-[#6A38C2]">Jobs</span></h1>
          <p className="mt-2 text-sm text-gray-500">Explore opportunities from leading companies and find the role that matches your skills and career goals.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobIds.map((jobId) => <LatestJobsCard key={jobId} />)}
        </div>
      </section>



    </>
  )
}

export default LatestJobs