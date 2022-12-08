import { Ship } from "../../entities/ship";
export interface ShipRepository { 
    createShip(contact: Ship): Promise<boolean>;
    getShips(): Promise<Ship[]>; 
}