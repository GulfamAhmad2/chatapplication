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
        
        await sodium.ready
        const keyPair = sodium.crypto_box_keypair()
        const publicKey = sodium.to_base64(keyPair.publicKey)
        const privateKey = sodium.to_base64(keyPair.privateKey)
        // yaha pr jo tum public key server save kr rhe the wo kr do baki sab sahi 
        // aur localstorage ki jagah pr indexdb use kro private kye aur chat ke liye
        // await api.post("/store-public-key",
        //     {publicKey},
        // )
        localStorage.setItem("privateKey", privateKey)
        return response.data
    } catch(error) {
        console.log("Error: " + error)
        throw new Error(error.response?.data?.message || "Failed to login user")
    }
} 

export const userProfile = async () => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Token not found!")
    try {
        const response = await api.get("/profile", {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data
    } catch(error) {
        console.log("Error: " + error)
        throw new Error(error.response?.data?.message || "Failed to get your profile")
    }
}