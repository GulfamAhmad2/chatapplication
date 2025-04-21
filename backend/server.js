import express from 'express'
import cors from 'cors'
import {connectDB} from './config/db.js'
import userRoutes from './routes/user.route.js'

const app = express()

app.use(express.json())
app.use(cors())


app.use("/api/auth", userRoutes)

const PORT = 5000

app.listen(PORT, () => {
    connectDB()
    console.log("Server is running at port: 5000")
})