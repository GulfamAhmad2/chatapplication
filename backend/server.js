import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from './routes/message.route.js'

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Client URL
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/message', messageRoutes)

const PORT = 5000;

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running at port: 5000");
});
