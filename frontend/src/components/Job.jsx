import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'

const Job = ({ job }) => {

  const navigate = useNavigate();
  const storageKey = 'jobPortalSavedJobs';
  const jobId = job?._id || job?.id;
  const getSavedJobIds = () => {
    try {
      const savedJobs = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return Array.isArray(savedJobs) ? savedJobs : [];
    } catch {
      return [];
    }
  };
  const [isSaved, setIsSaved] = useState(() => getSavedJobIds().includes(jobId));

  if (!job) return null;

  const toggleSavedJob = () => {
    if (!jobId) {
      toast.error('This job cannot be saved.');
      return;
    }

    const savedJobIds = getSavedJobIds();
    const willSave = !savedJobIds.includes(jobId);
    const nextSavedJobIds = willSave
      ? [...savedJobIds, jobId]
      : savedJobIds.filter((savedJobId) => savedJobId !== jobId);

    localStorage.setItem(storageKey, JSON.stringify(nextSavedJobIds));
    setIsSaved(willSave);
    toast.success(willSave ? 'Job saved successfully.' : 'Job removed from saved jobs.');
  };

  return (
    <article className="flex min-h-full w-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Avatar className="shrink-0">
            <AvatarImage
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Company logo"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#6A38C2]">{job.company?.name || 'Company Name'}</p>
            <h2 className="mt-1 truncate text-xl font-bold text-gray-900">{job.title}</h2>
            <p className="mt-1 break-words text-sm text-gray-500">{job.location}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label={isSaved ? 'Remove saved job' : 'Save job'}
          aria-pressed={isSaved}
          onClick={toggleSavedJob}
          className={`grid size-10 shrink-0 place-items-center rounded-full border text-xl transition ${
            isSaved
              ? 'border-[#6A38C2] bg-[#6A38C2] text-white hover:bg-[#5529a6]'
              : 'border-gray-300 bg-white text-gray-600 hover:border-[#6A38C2] hover:text-[#6A38C2]'
          }`}
        >
          {isSaved ? '\u2665' : '\u2661'}
        </button>
      </div>

      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
        {job.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">{job.jobType}</span>
        {job.requirements?.slice(0, 2).map((requirement) => (
          <span key={requirement} className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
            {requirement.trim()}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-gray-900">{job.position} positions</p>
        <button onClick={() => navigate(`/description/${job._id}`)}
          type="button"
          className="w-full rounded-lg bg-[#6A38C2] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#572da4] sm:w-auto"
        >
          View Details
        </button>
      </div>
    </article>
  )
}

export default Job
