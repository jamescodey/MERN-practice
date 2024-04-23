import express, { request } from "express";
import { PORT, mongoDBURL } from './config.js';
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling cors policy
// allows all origins with default of cors(*)
app.use(cors());
// allows custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'PUT', 'POST', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.use('/books', booksRoute);

// Connection to Mongo DB
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App is connected to database.");
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    })