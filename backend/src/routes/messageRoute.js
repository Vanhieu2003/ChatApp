import express from 'express';
import { sendDirectGroupMessage, sendDirectMessage } from "../controllers/messageController.js";
import { checkFriendship, checkGroupMembership } from '../middlewares/friendMiddleware.js';


const router = express.Router();

router.post("/direct",checkFriendship,sendDirectMessage);
router.post("/group",checkGroupMembership,sendDirectGroupMessage);


export default router