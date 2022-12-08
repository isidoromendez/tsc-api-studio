import { Ship } from "domain/entities/ship";
import { GetAllShipsUseCase } from "domain/interfaces/use-cases/ship/get-all-ships";
import { ShipRepository } from "domain/interfaces/repositories/ship-repository";

export class GetAllShips implements GetAllShipsUseCase {
    
    constructor(private shipRepository:ShipRepository){}

    async execute(): Promise<Ship[]> {
        return await this.shipRepository.getShips();    
    }
}