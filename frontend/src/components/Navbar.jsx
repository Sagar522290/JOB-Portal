import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const user = false // Replace with your user authentication logic;
  return (
    <>
      <div className="flex justify-between items-center px-10 py-5 shadow-md">
        <div className="bg-white">
          <h1 className="text-2xl font-bold">Job<span className="text-[#F83002]">Portal</span></h1>
        </div>
        <div className="flex items-center gap-5">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browser</li>
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
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.avatar || 'https://github.com/shadcn.png'} alt="User Avatar" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user.avatar || 'https://github.com/shadcn.png'} />
                    </Avatar>
                    <div>
                      <h4 className="font-bold">{user.name || 'John Doe'}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user.description || 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col my-3 text-gray-700 ">
                    <div className="flex w-fit  items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1">

                      <button variant="link" type="button" className="font-medium text-[#6A38C2] hover:underline">View Profile</button>
                    </div>
                    <div className="flex w-fit  items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1">

                      <button variant="link" type="button" className="font-medium text-red-600 hover:underline">Logout</button>
                    </div>
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










