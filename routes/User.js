import express from 'express';

const router = express.Router();

import {signupUser, loginUser, getCurrentUser} from '../controllers/User.js';
import auth from '../middlewares/Auth.js';

router.post("/signup", signupUser);
router.post("/signin", loginUser);
router.get("/me", auth, getCurrentUser);


export default router;