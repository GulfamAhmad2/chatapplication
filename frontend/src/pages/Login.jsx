import React, {useState} from 'react'
import {useMutation} from '@tanstack/react-query'
import {loginUser} from '../services/auth.js'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState("")
    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
          console.log("Login done")
            toast.success("Login Successfully")
            navigate("/")
        },
        onError: (error) => {
          console.log(error)
            setError(error.message)
        }
    })
    const handleChange= (e) => {
        const {value, name} = e.target
        setFormData({...formData, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate(formData)
        setFormData({
            username: '',
            password: ''
        })
    }
    return (
        <div className="flex items-center justify-center bg-gray-800 h-screen">
            <div className="bg-gray-700 rounded-2xl w-full max-w-md border border-gray-300 p-6">
                <div className="mb-4">
                    <h1 className="text-xl font-bold text-white text-center">Sign In Now</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-sm font-bold text-red-400 text-center">{error}</h1>
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-2 text-gray-400">
                        Username
                    </label>
                    <input 
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-emerald-300 focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-400 mb-2">
                        Password
                    </label>
                    <input 
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        className="border border-gray-600 rounded-md w-full px-3 py-2 text-white bg-gray-700 focus:ring-2 focus:outline-none focus:ring-emerald-300"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-md text-white" type="reset">Reset</button>
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md text-white" type="submit" disabled={mutation.isPending ? true : false }>Sign In</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Login