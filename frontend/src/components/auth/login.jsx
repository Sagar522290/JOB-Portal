import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    })

    const ChangeEventhandler = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(input);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-md border border-gray-300 bg-white p-6">
                <h1 className="mb-5 text-center text-xl font-bold">Login</h1>
                <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
                    <input id="email"
                        type="email"
                        value={input.email}
                        name="email"
                        onChange={ChangeEventhandler}
                        placeholder="john@example.com"
                        className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2" />                </div>
                <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
                    <input id="password"
                        type="password"
                        value={input.password}
                        name="password"
                        onChange={ChangeEventhandler}
                        placeholder="Create a password"
                        className="mb-5 w-full rounded-md border border-gray-300 px-4 py-2" />                </div>
                <button type="submit" className="w-full rounded-md bg-[#6A38C2] px-4 py-2 text-white hover:bg-[#5b30a6]">Login</button>
                <p className="mt-4 text-center text-sm">
                    Don&apos;t have an account? <Link to="/signup" className="font-medium text-[#6A38C2] hover:underline">Sign up</Link>
                </p>
            </form>
        </div>
    )
}
