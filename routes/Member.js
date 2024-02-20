import express from 'express';

import {addMember, removeMember} from '../controllers/Member.js';
const router = express.Router();

router.post("/", addMember);
router.delete("/:id", removeMember);


export default router;