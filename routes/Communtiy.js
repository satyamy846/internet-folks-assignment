import express from 'express';
const router = express.Router();
import {createCommunity, getAllCommunities } from '../controllers/Community.js';
import auth from '../middlewares/Auth.js';


router.post("/", auth, createCommunity);
router.get("/", auth, getAllCommunities);

export default router;