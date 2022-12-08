import { notImplementedError } from "../../../tests/commons";
import { Ship } from "../../entities/ship";
import { ShipRepository } from "../../interfaces/repositories/ship-repository";
import { CreateShip } from "./create-ship";

describe("Create Contact Use Case", () => {
    class MockShipRepository implements ShipRepository {
        createShip(contact: Ship): Promise<boolean> {
            throw notImplementedError
        }

        getShips(): Promise<Ship[]> {
            throw notImplementedError
        }
    }

    let mockShipRepository: MockShipRepository

    beforeEach(() => {
        jest.clearAllMocks();
        mockShipRepository = new MockShipRepository()
    })

    test("should return true", async () => {
        const InputData: Ship = {id:"id-value1", gas:"gas-value1",name:"name-value1"}

        jest.spyOn(mockShipRepository, "createShip").mockImplementation(() => Promise.resolve(true))
        const createContactUseCase = new CreateShip(mockShipRepository)
        const result = await createContactUseCase.execute(InputData);
        expect(result).toBe(true)
    });
})