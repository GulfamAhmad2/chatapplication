import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/chatapplication-db")
        console.log("Connection established")
    } catch(error) {
        console.log("Error: " + error.message)
    }
}