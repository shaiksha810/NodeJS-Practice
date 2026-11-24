import React, { useState } from 'react'
import { User, Mail, Lock, UserPlus } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import useApi from '../api/api'
import { useDispatch } from 'react-redux'
import { addUser } from '../features/authSlice'

const RegisterPage = () => {

    const api = useApi()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputValue((prev) => ({ ...prev, [name]: value }))
    }


    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const response = await api.post("/auth/register", inputValue)

           dispatch(addUser(response.data))
           navigate("/profile")

            setInputValue({
                name: '',
                email: '',
                password: ''
            })


        } catch (error) {
            console.log("error",error.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserPlus size={26} />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800">
                        Create Account
                    </h1>

                    <p className="text-gray-500 text-sm mt-2">
                        Sign up to get started with your account
                    </p>
                </div>

                {/* Register Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>

                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                            <input
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={inputValue.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={inputValue.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                            <input
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                value={inputValue.password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                    >
                        Create Account
                    </button>

                </form>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default RegisterPage
