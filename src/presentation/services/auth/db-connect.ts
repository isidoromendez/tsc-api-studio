import config from "../../../config";
import mongoose from "mongoose";

export default class MongoConnection {
    private static instance: MongoConnection
    private connection: mongoose.Connection
    private constructor() {
        this.connection = mongoose.createConnection(config.API_MONGO_URL)
    }

    public static getInstance(): MongoConnection {
        if (!MongoConnection.instance) {
            MongoConnection.instance = new MongoConnection();
        }

        return MongoConnection.instance
    }

    public getConnection() {
        return this.connection
    }
}