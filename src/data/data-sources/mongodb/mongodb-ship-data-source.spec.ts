
import { MongoDBContactShipDataSource } from '../../../../src/data/data-sources/mongodb/mongodb-ship-data-source'
import { DatabaseWrapper } from '../../../../src/data/interfaces/data-sources/database-wrapper';

describe("MongoDB DataSource", () => {

    let mockDatabase: DatabaseWrapper

    beforeAll(async () => {
        mockDatabase = {
            find: jest.fn(),
            insertOne: jest.fn()
        }
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("getAll", async () => {
        const ds = new MongoDBContactShipDataSource(mockDatabase);
        const expected = [
            {id:"id-value1", gas:"gas-value1",name:"name-value1"},
            {id:"id-value2", gas:"gas-value2",name:"name-value2"}
        ]
        jest.spyOn(mockDatabase, "find").mockImplementation(() => Promise.resolve(expected))
        const result = await ds.getAll();
        expect(mockDatabase.find).toHaveBeenCalledWith({})
        expect(result).toStrictEqual(expected)
    })


    test("create", async () => {
        const send = {gas:"gas-value1",name:"name-value1"}
        const ds = new MongoDBContactShipDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "insertOne").mockImplementation(() => Promise.resolve(true))
        const result = await ds.create(send);
        expect(mockDatabase.insertOne).toHaveBeenCalledWith(send)
        expect(result).toStrictEqual(true)
    })

})