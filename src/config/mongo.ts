import "dotenv/config";
import { connect } from "mongoose";

const DB_URI = <string>process.env.DB_URI;

async function dbConnect() : Promise<void> {
    await connect(DB_URI);       
}

export default dbConnect;