import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import connectDB from './database/dbConnection.js';
import {errorMiddleware} from "./middlewares/error.js"
import messageRouter from './router/messageRoute.js';
import userRouter from './router/userRoute.js';
import timeLineRouter from './router/timeLineRoute.js';
import softwareApplicationRouter from './router/softwareApplicationRoute.js';
import skillRouter from"./router/skillRoute.js";
import projectRouter from "./router/projectRoute.js";
import languageRouter from './router/languageRoute.js';

dotenv.config({ path: './config.env' });
const app = express();

//Middlewares
app.use(cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(fileUpload({ //It is used to get files from the frontend and store it in the backend. If we don't use this, we need to use multer.
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

app.get("/", (req, res) => {
    console.log("ROOT HIT");
    res.send("Server working");
});
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/timeline', timeLineRouter);
app.use('/api/v1/softwareapplication', softwareApplicationRouter);
app.use('/api/v1/skill', skillRouter);
app.use('/api/v1/project', projectRouter);
app.use('/api/v1/language', languageRouter);



connectDB();
app.use(errorMiddleware);// for handling errors.
export default app;
