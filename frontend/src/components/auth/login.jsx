import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_BASE_URL } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice.js'

export const Login = () => {

    const { loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_BASE_URL}/login`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate('/');
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            console.log(res.data);
        } catch (error) {
            const message = error.response?.data?.message || 'Unable to reach the server. Please try again.';
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
            });
        } finally {
            dispatch(setLoading(false));
        }
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
                <fieldset className="mb-5 flex items-center gap-4" aria-label="Account type">
                    <div className="flex items-center">
                        <input id="login-student" type="radio" value="student" name="role"
                            checked={input.role === "student"} onChange={ChangeEventhandler}
                            className="h-4 w-4 text-[#6A38C2] focus:ring-[#6A38C2]" />
                        <label htmlFor="login-student" className="ml-2 text-sm font-medium">Student</label>
                    </div>
                    <div className="flex items-center">
                        <input id="login-recruiter" type="radio" value="recruiter" name="role"
                            checked={input.role === "recruiter"} onChange={ChangeEventhandler}
                            className="h-4 w-4 text-[#6A38C2] focus:ring-[#6A38C2]" />
                        <label htmlFor="login-recruiter" className="ml-2 text-sm font-medium">Recruiter</label>
                    </div>
                </fieldset>
                {
                    loading ? (
                        <button disabled className="w-full rounded-md bg-[#6A38C2] px-4 py-2 text-white">
                            Please wait...
                        </button>
                    ) : (
                        <button type="submit" className="w-full rounded-md bg-[#6A38C2] px-4 py-2 text-white hover:bg-[#5b30a6]">
                            Login
                        </button>
                    )
                }
                <p className="mt-4 text-center text-sm">
                    Don&apos;t have an account? <Link to="/signup" className="font-medium text-[#6A38C2] hover:underline">Sign up</Link>
                </p>
            </form>
        </div>
    )
}
