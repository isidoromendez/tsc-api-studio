import { Ship } from "../../../entities/ship";
export interface CreateShipUseCase {
    execute(ship:Ship): Promise<boolean>  
}