import { Ship } from "domain/entities/ship";
import { CreateShipUseCase } from "domain/interfaces/use-cases/ship/create-ship";
import { ShipRepository } from "domain/interfaces/repositories/ship-repository";

export class CreateShip implements CreateShipUseCase {

    constructor(private shipRepository:ShipRepository){}

    execute(ship: Ship): Promise<boolean> {
        return this.shipRepository.createShip(ship)
    }
}