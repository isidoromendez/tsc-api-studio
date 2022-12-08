import { Ship } from "../../../entities/ship";
export interface GetAllShipsUseCase { 
    execute(): Promise<Ship[]>; 
}