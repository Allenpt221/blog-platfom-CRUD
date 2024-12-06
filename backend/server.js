import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';

import userRouter from './router/auth.router.js';

const app = express();
dotenv.config();
app.use(express.json()); // allow us to access data
const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.use("/api/auth", userRouter);
app.use("/api/blog", userRouter);

app.listen(PORT, () =>{
    console.log("Server is listenting to http://localhost:" + PORT);
    connectDB();
});