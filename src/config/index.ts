import * as dotenv from "dotenv";
import { Config } from "presentation/interfaces/config";
dotenv.config()
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const config:Config = {
    PORT: Number(process.env.PORT) || 3001,
    API_MONGO_URL: <string>process.env.API_MONGO_URL || "mongodb://example:27017/dbapi",

    DOMAIN_MONGO_URL: <string>process.env.DOMAIN_MONGO_URL || "mongodb://example:27017/db",
    DOMAIN_MONGO_DB: <string>process.env.DOMAIN_MONGO_DB || "db"
}



export default config;