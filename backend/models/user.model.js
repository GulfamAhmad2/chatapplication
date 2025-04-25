import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  }
      role: {
        type: Number,
        enum: [1, 2, 3], // 1 = admin, 2 = moderator, 3 = user
        default: 3,
        required: true,
      },
      password: {
        type: String
      }
  });

export default mongoose.model("User", userSchema);
