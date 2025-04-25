import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000/api/auth"
})

export const registerUser = async (userData) => {
    try {
        const response = await api.post("/signup", userData)
        return response.data
    } catch(error) {
        throw new Error(error.response?.data?.message || "Failed to register user")
    }
}