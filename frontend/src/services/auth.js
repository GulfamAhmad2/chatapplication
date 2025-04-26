import axios from 'axios'
import sodium from 'libsodium-wrappers'

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

export const loginUser = async (userData) => {
    try {
        const response = await api.post("/login", userData, {
            withCredentials: true,
        })
        const token = response.data.token
        localStorage.setItem("token", token)
        await sodium.ready
        const keyPair = sodium.crypto_box_keypair()
        const publicKey = sodium.to_base64(keyPair.publicKey)
        const privateKey = sodium.to_base64(keyPair.privateKey)
        await api.post("/store-public-key",
            {publicKey},
            {headers: {Authorization: `Bearer ${token}`}}
        )
        localStorage.setItem("privateKey", privateKey)
        return response.data
    } catch(error) {
        console.log("Error: " + error)
        throw new Error(error.response?.data?.message || "Failed to login user")
    }
} 