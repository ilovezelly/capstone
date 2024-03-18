import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import db from "./utils/db.js";
// import mysql from 'mysql2';
// import dotenv from 'dotenv';
import { adminRouter } from "./routes/AdminRoute.js";
import {studentRouter} from './routes/StudentRoute.js';

const app = express();
const portApp = 3000;

app.use(cors({
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true // Enable credentials if needed (e.g., cookies, authorization headers)
      }));
app.use(express.json());

app.use('/auth', adminRouter);
app.use('/auth', studentRouter);


app.listen(portApp, ()=>
    {
        console.log(`Server is running`);
    });


