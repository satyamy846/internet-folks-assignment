import express from 'express';

const router = express.Router();
import { createRole, getRoles } from '../controllers/Role.js';

router.post("/", createRole);
router.get("/", getRoles);

export default router;
