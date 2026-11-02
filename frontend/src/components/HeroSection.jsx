import React from 'react'

export const HeroSection = () => {
    return (
        <>
            <div className="text-center mt-8">
                <div className='flex flex-col gap-5 my-10'>
                    <span className="mx-auto px-4 rounded-full bg-gray-100 text-[#f83002] font-medium font-semibold py-1">No. 1 Job Portal</span>
                    <h1 className="text-5xl font-bold text-center">
                        Search, Apply & <br /> Get Your <span className="text-[#6A38C2]">Dream Jobs</span></h1>
                    <p className="mt-4 text-center text-sm">Find your dream job or the perfect candidate with ease.</p>
                    <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <form
                        className="mx-auto flex w-[calc(100%-2rem)] max-w-2xl items-center rounded-full border border-gray-300 bg-white p-1.5 shadow-lg focus-within:border-[#6A38C2] focus-within:ring-2 focus-within:ring-[#6A38C2]/20"
                        role="search"
                    >
                        <label htmlFor="hero-job-search" className="sr-only">Search jobs</label>
                        <input
                            id="hero-job-search"
                            type="search"
                            placeholder="Find your dream job"
                            className="min-w-0 flex-1 border-none bg-transparent px-4 py-2 text-gray-800 outline-none placeholder:text-gray-400"
                        />
                        <button type="submit" className="flex shrink-0 items-center gap-2 rounded-full bg-[#f83002] px-5 py-2.5 font-medium text-white transition duration-300 hover:bg-[#d62800] focus:outline-none focus:ring-2 focus:ring-[#f83002] focus:ring-offset-2">
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                                <circle cx="11" cy="11" r="7" />
                                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                            </svg>
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
