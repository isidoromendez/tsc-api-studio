import { Ship } from "../../../domain/entities/ship";

export interface ShipDataSource {
    create(ship: Ship): Promise<boolean>;
    getAll(): Promise<Ship[]>;
}