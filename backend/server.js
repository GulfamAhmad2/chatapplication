import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from './routes/message.route.js'

// agar tumhara concept clear hogya hai socket main
//  to ye jo socket setup mvc ka use krke phir set up kr do
const app = express();
app.use(express.json());
app.use(cookieParser())
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.use(cors({
  origin: "http://localhost:5173", // your React app
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/message', messageRoutes)

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
});

const PORT = 5000;

server.listen(PORT, () => {
  connectDB();
  console.log("Server is running at port: 5000");
});
