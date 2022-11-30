import "dotenv/config"
import express  from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongo";

const PORT = process.env.PORT || 3001

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(cors());
app.use(router);
app.use(express.json);
db().then(()=>{
    console.log('Connetion OK');
}).catch((error)=>{
    console.error(`DB connection error: ${error}`);
});
app.listen(PORT,() => {
    console.log(`Started on port ${PORT}`);
})

