import { DatabaseWrapper } from "data/interfaces/data-sources/database-wrapper";
import { ShipDataSource } from "data/interfaces/data-sources/ship-data-source";
import { Ship } from "../../../domain/entities/ship";

export class MongoDBContactShipDataSource implements ShipDataSource {
    constructor(private database: DatabaseWrapper) {}
    async create(ship: Ship): Promise<boolean> {
        return await this.database.insertOne(ship)
    }

    async getAll(): Promise<Ship[]> {        
        const result = await this.database.find({})
        return result.map(item => ({
            id: item._id.toString(),
            name: item.name,
            gas: item.gas
        }));
    }
}