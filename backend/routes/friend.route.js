import express from 'express'
import { acceptFriendReq, blockUser, getSentFriendRequests, rejectFriendReq, searchUsers, sentFriendRequests, unfriend } from '../controllers/friend.js'
const router = express.Router();
router.get("/search", searchUsers)
router.post("/send-request/:userId", sentFriendRequests )
router.post("/accept-request/:userId", acceptFriendReq )
router.post("/reject-request/:userId", rejectFriendReq )
router.post("/unfriend-request/:userId", unfriend )
router.post("/block-request/:userId", blockUser )
router.get("/requests-sent", getSentFriendRequests)


export default router