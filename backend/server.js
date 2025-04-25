import express from 'express'
import cors from 'cors'
import {connectDB} from './config/db.js'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
// import cookieParser from 'cookie-parser'

const app = express()
// app.use(cookieParser)
app.use(express.json())
app.use(cors())


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes)

const PORT = 5000

app.listen(PORT, () => {
    connectDB()
    console.log("Server is running at port: 5000")
})