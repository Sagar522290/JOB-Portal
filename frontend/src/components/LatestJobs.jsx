import LatestJobsCard from './LatestJobsCard'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
  const allJobs = useSelector((store) => store.job.allJobs)

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-left">
          <h1 className="text-3xl font-bold text-[#6A38C2]">Latest & Top <span className="text-gray-900">Jobs Openings</span></h1>
          <p className="mt-2 text-sm text-gray-500">Explore opportunities from leading companies and find the role that matches your skills and career goals.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {allJobs.length === 0 ? (
            <p className="col-span-full text-center text-sm text-gray-500">No jobs available</p>
          ) : (
            allJobs.slice(0, 6).map((job) => (
              <LatestJobsCard key={job._id} job={job} />
            ))
          )}
        </div>
      </section>



    </>
  )
}

export default LatestJobs