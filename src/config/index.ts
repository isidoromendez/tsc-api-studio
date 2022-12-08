
const config = {
    PORT: process.env.PORT as unknown as number || 3001,
    API_MONGO_URL: <string>process.env.API_MONGO_URL || "mongodb://localhost:27017/tsc-api",

    DOMAIN_MONGO_URL: <string>process.env.DOMAIN_MONGO_URL || "mongodb://localhost:27017/ships",
    DOMAIN_MONGO_DB: <string>process.env.DOMAIN_MONGO_DB || "SHIPS_DB"
}

export default config;