import { ShipDataSource } from "data/interfaces/data-sources/ship-data-source";
import { Ship } from "domain/entities/ship";
import { ShipRepository } from "domain/interfaces/repositories/ship-repository";

export class ShipRepositoryImpl implements ShipRepository {
    
    constructor(private shipDataSource: ShipDataSource) {}

    createShip(ship: Ship): Promise<boolean> {
        return this.shipDataSource.create(ship)
    }

    getShips(): Promise<Ship[]> {        
        return this.shipDataSource.getAll()
    }
}