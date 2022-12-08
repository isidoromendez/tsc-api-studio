import server from './presentation/server'
import ShipRouter from './presentation/routers/ship/ship-router'
import { GetAllShips } from './domain/use-cases/ship/get-all-ships'
import { ShipRepositoryImpl } from './domain/repositories/ship-repository'
import { CreateShip } from './domain/use-cases/ship/create-ship'
import { MongoClient } from 'mongodb'
import { DatabaseWrapper } from "./data/interfaces/data-sources/database-wrapper";
import { MongoDBContactShipDataSource } from './data/data-sources/mongodb/mongodb-ship-data-source'
import config from "./config";

const initShipRouter = async () => {
    const client: MongoClient = new MongoClient(config.DOMAIN_MONGO_URL)
    await client.connect()
    const db = client.db(config.DOMAIN_MONGO_DB);

    const shipDatabase: DatabaseWrapper = {
        find: (query) => db.collection("ships").find(query).toArray(),
        insertOne: (doc) => db.collection("ships").insertOne(doc)
    }

    return ShipRouter(
        new GetAllShips(new ShipRepositoryImpl(new MongoDBContactShipDataSource(shipDatabase))),
        new CreateShip(new ShipRepositoryImpl(new MongoDBContactShipDataSource(shipDatabase))),
    )
}

(async () => {
    const shipRouter = await initShipRouter()
    server.use("/ship", shipRouter)
    server.listen(3002, () => console.log("Running on server"))
})()