import express from 'express';
import dotenv from 'dotenv';
import {mongooseConnection} from './config/mongooseConnections.js';
import userRouter from './routes/User.js';
import roleRouter from './routes/Role.js';
import communityRouter from './routes/Communtiy.js';
import memberRouter from './routes/Member.js';
import globalErrorResponse from './utilities/ErrorHelpers/GlobalErrorResponse.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/v1/auth", userRouter);
app.use("/v1/role", roleRouter);
app.use("/v1/community", communityRouter);
app.use("/v1/member", memberRouter);

app.get("/", (req, res) =>{
    res.send(`Server is running`);
})

mongooseConnection();
app.use(globalErrorResponse);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, ()=>{
    console.log(`Server instance running http://localhost:${PORT} `);
})