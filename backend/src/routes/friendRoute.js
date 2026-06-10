import express, { Router } from "express";
import { sendFriendRequest,acceptFriendRequest,declineFriendRequest,getAllFriend,getFriendRequests } from "../controllers/friendController.js";

const router = express.Router();


router.post("/requets",sendFriendRequest);
router.post("/request/:requestId/accept",acceptFriendRequest);
router.post("/request/:requestId/decline",declineFriendRequest);
router.get("/",getAllFriend);
router.get("/requets",getFriendRequests);

export default router;