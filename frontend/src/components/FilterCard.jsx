import React from 'react'

const FilterCard = ({
  location,
  onLocationChange,
  jobTypes,
  onJobTypeChange,
  onClear
}) => {


  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm lg:sticky lg:top-24">
      <div className="rounded-t-2xl bg-gradient-to-r from-[#6A38C2] to-[#8A5CF5] px-5 py-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-100">Find your fit</p>
        <h2 className="mt-1 text-xl font-bold">Filter Jobs</h2>
      </div>

      <div className="space-y-5 p-4 sm:p-5">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-gray-800">Location</span>
          <select
            value={location}
            onChange={(event) => onLocationChange(event.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none focus:border-[#6A38C2]"
          >
            <option value="">All locations</option>
            <option value="India">India</option>
            <option value="Remote">Remote</option>
            <option value="Bangalore">Bangalore</option>
          </select>
        </label>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-gray-800">Job type</legend>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 lg:grid-cols-1">
            {['Full Time', 'Part Time', 'Remote', 'Internship'].map((type) => (
              <label key={type} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={jobTypes.includes(type)}
                  onChange={() => onJobTypeChange(type)}
                  className="size-4 accent-[#6A38C2]"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button type="button" onClick={onClear} className="w-full rounded-lg border border-[#6A38C2] px-4 py-2.5 text-sm font-semibold text-[#6A38C2] transition hover:bg-[#6A38C2] hover:text-white">
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default FilterCard