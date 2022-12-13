import { Ship } from "../../entities/ship";
import { ShipRepository } from "../../interfaces/repositories/ship-repository";
import { GetAllShips } from "./get-all-ships";
describe("Get All Ships Use Case", () => {
    class MockShipRepository implements ShipRepository {
        createShip(contact: Ship): Promise<boolean> {
            throw new Error("Method not implemented.")
        }
        getShips(): Promise<Ship[]> {
            throw new Error("Method not implemented.")
        }
    }

    let mockShipRepository: ShipRepository

    beforeEach(() => {
        jest.clearAllMocks();
        mockShipRepository = new MockShipRepository()
    })

    test("should return all ships", async () => {
        const ExpectedResult:Ship[] = [
            {id:"id-value1", gas:"gas-value1",name:"name-value1"},
            {id:"id-value2", gas:"gas-value2",name:"name-value2"}
        ]

        jest.spyOn(mockShipRepository, "getShips").mockImplementation(() => Promise.resolve(ExpectedResult))
        const getAllContactsUse = new GetAllShips(mockShipRepository)
        const result = await getAllContactsUse.execute();
        expect(result).toStrictEqual(ExpectedResult)

    });
})

