import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    enum: [1, 2, 3], // 1 = admin, 2 = moderator, 3 = user
    default: 3,
    required: true,
  },
  // ye model changes kiya hu aur future main add honge 
  // but tum isme public key ka value save kr do server main
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequestsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequestsReceived: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ],

  publicKey: { type: String },
});

export default mongoose.model("User", userSchema);
