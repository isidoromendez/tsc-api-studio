import mongoose from "mongoose";
import { Config } from "presentation/interfaces/config";


mongoose.connection.on('error', err => {
    console.error(err);
});

const apiConn = (config:Config):mongoose.Connection => {
    // try {
        console.debug('apiConn',config)
        const conn = mongoose.createConnection(config.API_MONGO_URL)
        if (!conn || !conn?.readyState)
            throw new Error("Unknow");

        return conn
    // } catch (error) {
    //     console.error("UPS! something is wrong with mongo:",error)
        
    // }
}    

export default apiConn