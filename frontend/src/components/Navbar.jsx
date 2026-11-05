import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/authSlice'
import { BriefcaseBusiness, LogOut, UserRound } from 'lucide-react'

const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const displayName = user?.fullname || user?.name || 'User'
  return (
    <>
      <div className="flex justify-between items-center px-4 md:px-10 py-4 shadow-sm border-b border-gray-100 bg-white">
        <div className="bg-white">
          <h1 className="text-2xl font-bold tracking-tight">Job<span className="text-[#F83002]">Portal</span></h1>
        </div>
        <div className="flex items-center gap-5">
          <ul className="hidden md:flex font-medium items-center gap-8">
            {[
              { label: 'Home', path: '/' },
              { label: 'Jobs', path: '/jobs' },
              { label: 'Browser', path: '/browser' }
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="relative inline-block py-1 transition-colors duration-200 hover:text-[#6A38C2] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[#6A38C2] after:transition-transform after:duration-200 hover:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {
            !user ? (
              <div className="flex items-center gap-2">
                <Link to="/login"><button type="button" className="rounded-md border px-4 py-2 hover:bg-gray-100">Login</button></Link>
                <Link to="/signup"><button type="button" className="rounded-md bg-[#6A38C2] px-4 py-2 text-white hover:bg-[#5b30a6]">Signup</button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer h-11 w-11 ring-2 ring-transparent transition-all hover:ring-[#6A38C2]/25 focus:outline-none focus:ring-[#6A38C2]/40">
                    <AvatarImage src={user?.profile?.profilePhoto } alt="User Avatar" />
                    <AvatarFallback>{displayName[0]}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] overflow-hidden rounded-xl border-gray-200 p-0 shadow-xl">
                  <div className="flex items-center gap-3 bg-gradient-to-br from-[#6A38C2]/10 to-white px-4 py-4">
                    <Avatar className="h-12 w-12 ring-2 ring-white">
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback>{displayName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h4 className="truncate font-semibold text-gray-900">{displayName}</h4>
                      <p className="truncate text-sm text-gray-500">
                        {user.description || 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'}
                      </p>
                    </div>
                  </div>
                  <div className="m-2 flex flex-col gap-1">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left font-medium text-gray-700 transition-colors hover:bg-[#6A38C2]/10 hover:text-[#6A38C2]"
                    >
                      <UserRound className="h-4 w-4" />
                      View Profile
                    </Link>
                    <Link
                      to="/appliedjobs"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left font-medium text-gray-700 transition-colors hover:bg-[#6A38C2]/10 hover:text-[#6A38C2]"
                    >
                      <BriefcaseBusiness className="h-4 w-4" />
                      Applied Jobs
                    </Link>
                    <button
                      type="button"
                      onClick={() => dispatch(setUser(null))}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Navbar
