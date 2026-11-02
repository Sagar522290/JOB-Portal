import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="bg-slate-950 py-10 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 border-b border-white/10 pb-8 md:grid-cols-3">
            <div>
              <h2 className="text-2xl font-bold">Job<span className="text-[#F83002]">Portal</span></h2>
              <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
                Find your next opportunity or discover the perfect candidate for your team.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Quick Links</h3>
              <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
                <a href="/" className="transition hover:text-white">Home</a>
                <a href="/jobs" className="transition hover:text-white">Browse Jobs</a>
                <a href="/signup" className="transition hover:text-white">Create Account</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Legal</h3>
              <div className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
                <a href="/privacy" className="transition hover:text-white">Privacy Policy</a>
                <a href="/terms" className="transition hover:text-white">Terms of Service</a>
              </div>
            </div>
          </div>
          <p className="pt-6 text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer