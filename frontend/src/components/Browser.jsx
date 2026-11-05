import React from 'react'
import Navbar from './Navbar'
import Job from './Job'
import { useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs'

const Browser = () => {
  useGetAllJobs()
  const jobs = useSelector((store) => store.job.allJobs)

  return (
    <>
    <Navbar/>
    <div className='max-w-7xl mx-auto my-10'>
      <h1 className='font-bold text-xl my-10'>Search Result ({jobs.length})</h1>
      <div className='grid grid-cols-3 gap-4'>
      {
        jobs.filter(Boolean).map((job)=>{
          return(
             <Job key={job._id} job={job}/>
          )
        })
      }
      </div>
    </div>
    </>
  )
}

export default Browser