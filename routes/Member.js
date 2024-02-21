import express from 'express';
const router = express.Router();

import {addMember, removeMember} from '../controllers/Member.js';
import auth from '../middlewares/Auth.js';

router.post("/", auth, addMember);
router.delete("/:id", auth, removeMember);


export default router;