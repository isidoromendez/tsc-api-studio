import "dotenv/config"
import express  from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongo";

const appx = async () => {
    const app = express();
    app.use(express.urlencoded({extended: true}));
    app.use(express.json()) // To parse the incoming requests with JSON payloads
    app.use(cors());
    app.use(router);
    app.use(express.json);
    try {
        await db();
        // TODO: inform: console.log('Connetion OK');
    } catch (error) {
        console.error(`DB connection error: ${error}`);
    }
    
    return app;
};

export { appx }