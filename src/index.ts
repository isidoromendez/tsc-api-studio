import "dotenv/config"
import { appx as application } from "../src/app";
import config from "./config";

let server;
application().then((app) => {
    server = app.listen(config.PORT,() => {
        console.log(`Started on port ${config.PORT}`);
    });    
}).catch((e) => {
    console.log(e);
});


