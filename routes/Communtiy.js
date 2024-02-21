import express from 'express';
const router = express.Router();
import {createCommunity, getAllCommunities, getMyJoinedCommunity, getMyOwnedCommunity, getAllMembers} from '../controllers/Community.js';
import auth from '../middlewares/Auth.js';


router.post("/", auth, createCommunity);
router.get("/", auth, getAllCommunities);
router.get("/me/member", getMyJoinedCommunity);
router.get("/me/owner", auth, getMyOwnedCommunity);
router.get("/:id/members", getAllMembers);

export default router;