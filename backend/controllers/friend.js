import User from "../models/user.model.js";
export const sentFriendRequests = async (req, res) => {
  try {
    const sender = req.user;
    const receiverId = req.params.userId;
    // khud friend req nhi bhej sakte
    if (sender._id.equals(receiverId))
      return res
        .status(400)
        .json({ message: "Cannot send request to yourself" });

    // kya receiver data base hai ya nhi
    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ message: "User not found" });

    // agar tumko ko kisi ne block kr diya
    if (sender.blockedUsers.includes(receiverId)) {
      return res.status(403).json({ message: "You are blocked by this user" });
    }
    // agar tum already friend ho
    if (sender.friends.includes(receiverId)) {
      return res.status(400).json({ message: "Already friends" });
    }

    // agar tumne already friend req bheja hai
    if (sender.friendRequestsSent.includes(receiverId)) {
      return res.status(400).json({ message: "Request already sent" });
    }
    // jisko bhi aap req bheje wo tumhare array main store ho rha hai
    await User.findByIdAndUpdate(sender._id, {
      $addToSet: { friendRequestsSent: receiverId },
    });
    // receviver ke array aapka id save ho rha hai
    await User.findByIdAndUpdate(receiverId, {
      $addToSet: { friendRequestsReceived: sender._id },
    });

    res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const acceptFriendReq = async (req, res) => {
  try {
    const currentUser = req.user;
    const senderId = req.params.userId;
    if (!currentUser.friendRequestsReceived.includes(senderId)) {
      return res.status(400).json({ message: "No request from this user" });
    }
    // dono user ke req and receive array ko update kro
    await Promise.all([
      User.findByIdAndUpdate(currentUser._id, {
        $pull: { friendRequestsReceived: senderId },
        $addToSet: { friends: senderId },
      }),
      User.findByIdAndUpdate(senderId, {
        $pull: { friendRequestsSent: currentUser._id },
        $addToSet: { friends: currentUser._id },
      }),
    ]);
    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectFriendReq = async (req, res) => {
  const currentUser = req.user;
  const senderId = req.params.userId;
  if (!currentUser.friendRequestsReceived.includes(senderId)) {
    return res.status(400).json({ message: "Not friends" });
  }
  try {
    await Promise.all([
      User.findByIdAndUpdate(currentUser._id, {
        $pull: { friendRequestsReceived: senderId },
      }),
      User.findByIdAndUpdate(senderId, {
        $pull: { friendRequestsSent: currentUser._id },
      }),
    ]);
    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unfriend = async (req, res) => {
  try {
    const currentUser = req.user;
    const friendId = req.params.userId;
    // agar user friend nhi hai to
    if (!currentUser.friends.includes(friendId)) {
      return res.status(400).json({ message: "Not friends" });
    }
    // agar user friend hai to promise run kro
    await Promise.all([
      User.findByIdAndUpdate(currentUser._id, {
        $pull: { friends: friendId },
      }),
      User.findByIdAndUpdate(friendId, {
        $pull: { friends: currentUser._id },
      }),
    ]);
    res.status(200).json({ message: "Unfriended successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const blockUser = async (req, res) => {
  try {
    const currentUser = req.user;
    const blockUserId = req.params.userId;
    await Promise.all([
      User.findByIdAndUpdate(currentUser._id, {
        $addToSet: {
          blockedUsers: blockUserId,
        },
        $pull: {
          friends: blockUserId,
          friendRequestsSent: blockUserId,
          friendRequestsReceived: blockUserId,
        },
      }),
      User.findByIdAndUpdate(blockUserId, {
        $pull: {
          friends: blockUserId,
          friendRequestsSent: blockUserId,
          friendRequestsReceived: blockUserId,
        },
      }),
    ]);
    res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSentFriendRequests = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).populate(
      "friendRequestsSent",
      "username"
    );
    res.status(200).json({ sentRequests: currentUser.friendRequestsSent }); // even if empty
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    if (!searchQuery || searchQuery.trim() === "")
      return res.status(400).json({ message: "Search query is required" });
    const users = await User.find({
      username: {
        $regex: searchQuery,
        $options: "i",
      },
    }).select("username bgColor");
    res.status(200).json({users});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
