import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        role: "",
        file: "",
    })

    const ChangeEventhandler = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const changeFileHandler = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(input);
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
            <form onSubmit={handleSubmit} className='w-full max-w-md rounded-md border border-gray-300 bg-white p-6'>
                <h1 className='mb-5 text-center text-xl font-bold'>Sign Up</h1>
                <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium">Full name</label>
                    <input id="name"
                        type="text"
                        value={input.fullname}
                        name="fullname"
                        onChange={ChangeEventhandler}
                        placeholder="John Doe"
                        className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2" />
                </div>
                <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
                    <input id="email"
                        type="email"
                        value={input.email}
                        name="email"
                        onChange={ChangeEventhandler}
                        placeholder="john@example.com"
                        className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2" />
                </div>
                <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
                    <input id="password"
                        type="password"
                        value={input.password}
                        name="password"
                        onChange={ChangeEventhandler}
                        placeholder="Create a password"
                        className="mb-5 w-full rounded-md border border-gray-300 px-4 py-2" />
                </div>
                <div className="mt-4 flex flex-col gap-4">
                    <fieldset className="flex items-center gap-4" aria-label="Account type">
                        <div className="flex items-center">
                            <input id="user"
                                type="radio"
                                value={input.role === "student" ? "student" : ""}
                                name="accountType"
                                onChange={ChangeEventhandler}
                                className="h-4 w-4 text-[#6A38C2] focus:ring-[#6A38C2]" />
                            <label htmlFor="user" className="ml-2 text-sm font-medium">student</label>
                        </div>
                        <div className="flex items-center">
                            <input id="employer"
                                type="radio"
                                value={input.role === "recruiter" ? "recruiter" : ""}
                                name="accountType"
                                onChange={ChangeEventhandler}
                                className="h-4 w-4 text-[#6A38C2] focus:ring-[#6A38C2]" />
                            <label htmlFor="employer"
                                className="ml-2 text-sm font-medium">Recruiter</label>
                        </div>
                    </fieldset>
                    <div className="flex flex-col">
                        <label htmlFor="profile" className="mb-1 text-sm font-medium">Profile</label>
                        <input
                            id="profile"
                            type="file"
                            // value={input.profile}
                            accept="image/*"
                            name="profile"
                            onChange={changeFileHandler}
                            className="w-full cursor-pointer rounded-md border border-gray-300 text-sm file:mr-4 file:border-0 file:bg-[#6A38C2] file:px-4 file:py-2 file:text-white hover:file:bg-[#5b30a6]"
                        />
                    </div>
                </div>
                <button type="submit" className="mt-5 w-full rounded-md bg-[#6A38C2] px-4 py-2 text-white hover:bg-[#5b30a6]">Sign Up</button>
                <p className="mt-4 text-center text-sm">
                    Already have an account? <Link to="/login" className="font-medium text-[#6A38C2] hover:underline">Login</Link>
                </p>
            </form>
        </div>
    )
}

export default Signup