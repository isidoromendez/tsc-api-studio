import { notImplementedError } from "../../tests/commons";
import { ShipDataSource } from "../../data/interfaces/data-sources/ship-data-source";
import { Ship } from "../entities/ship";
import { ShipRepository } from "../../domain/interfaces/repositories/ship-repository";
import { ShipRepositoryImpl } from "./ship-repository";

class MockShipDataSource implements ShipDataSource {
    create(contact: Ship): Promise<boolean> {
        throw notImplementedError
    }

    getAll(): Promise<Ship[]> {
        throw notImplementedError
    }
}


describe("Ship Repository", () => {
    let mockShipDataSource : ShipDataSource
    let shipRepository : ShipRepository

    beforeEach(() => {
        jest.clearAllMocks();
        mockShipDataSource = new MockShipDataSource()
        shipRepository = new ShipRepositoryImpl(mockShipDataSource)
    })

    describe("getAllShips", () => {
        test("should return data", async () => {
            const expectedData:Ship[] = [
                {id:"id-value1", gas:"gas-value1",name:"name-value1"},
                {id:"id-value2", gas:"gas-value2",name:"name-value2"}
            ]
            jest.spyOn(mockShipDataSource, "getAll").mockImplementation(() => Promise.resolve(expectedData))
            const result = await shipRepository.getShips();
            expect(result).toBe(expectedData)
        });
    })

    describe("createShip", () => {
        test("should return true", async () => {
            const inputData: Ship = {id:"id-value1", gas:"gas-value1",name:"name-value1"}
            jest.spyOn(mockShipDataSource, "create").mockImplementation(() => Promise.resolve(true))
            const result = await shipRepository.createShip(inputData);
            expect(result).toBe(true)
        });
    })
})