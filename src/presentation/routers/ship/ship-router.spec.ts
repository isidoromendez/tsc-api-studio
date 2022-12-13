import request from "supertest";
import { Ship } from "../../../domain/entities/ship";  
import { CreateShipUseCase } from "../../../domain/interfaces/use-cases/ship/create-ship";
import { GetAllShipsUseCase } from "../../../domain/interfaces/use-cases/ship/get-all-ships";
import ShipRouter from "./ship-router";
import server from "../../../server";

class MockGetAllShipsUseCase implements GetAllShipsUseCase {
    execute(): Promise<Ship[]> {
        throw new Error("Method not implemented.")
    }
}

class MockCreateShiptUseCase implements CreateShipUseCase {
    execute(contact: Ship): Promise<boolean> {
       throw new Error("Method not implemented.")
    }
}

describe("Ship Router", () => {
    let mockCreateShiptUseCase: CreateShipUseCase
    let mockGetAllShipsUseCase: GetAllShipsUseCase

    beforeAll(() => {
        mockGetAllShipsUseCase = new MockGetAllShipsUseCase()
        mockCreateShiptUseCase = new MockCreateShiptUseCase()
        server.use("/ship", ShipRouter(mockGetAllShipsUseCase, mockCreateShiptUseCase))
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("GET /ship", () => {
        test("GET /ship should return 200 with data", async () => {
            const ExpectedData:Ship[] = [{ gas:"gas-value",name:"name-value",id:"id-value" }];
            jest.spyOn(mockGetAllShipsUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData))

            const response = await request(server).get("/ship")

            expect(response.status).toBe(200)
            expect(mockGetAllShipsUseCase.execute).toBeCalledTimes(1)
            expect(response.body).toStrictEqual(ExpectedData)
        });

        test("GET /ship returns 500 on use case error", async () => {
            jest.spyOn(mockGetAllShipsUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).get("/ship")
            expect(response.status).toBe(500)
            expect(response.body).toStrictEqual({ message: "Error fetching data" })
        });
    })

    describe("POST /ship", () => {
        test("POST /ship", async () => {
            const inputData = { id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" }
            jest.spyOn(mockCreateShiptUseCase, "execute").mockImplementation(() => Promise.resolve(true))
            const response = await request(server).post("/ship").send(inputData)
            expect(response.status).toBe(201)
        });

        test("POST /ship returns 500 on use case error", async () => {
            const inputData = {id:"id-value1", gas:"gas-value1",name:"name-value1"}
            jest.spyOn(mockCreateShiptUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).post("/ship").send(inputData)
            expect(response.status).toBe(500)
        });
    })
})