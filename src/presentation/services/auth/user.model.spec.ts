import { Model } from "mongoose";
import { User } from "../../interfaces/user";
import { getUserModel } from "./user.model";
import config from "../../../config";
import { MongoMemoryServer } from 'mongodb-memory-server';
describe('UserSchema', () => {
    const env = process.env
    let mongodb: MongoMemoryServer
    let uri: string

    beforeAll(async () => {
        jest.resetModules()
        process.env = { ...env }        
        mongodb = await MongoMemoryServer.create()
        uri = mongodb.getUri();
        
    })

    afterAll( async () => {
        await mongodb.stop()
        process.env = env
    })

    test('must get a model', async () => {
        config.API_MONGO_URL = `${uri}api`
        config.DOMAIN_MONGO_URL = `${uri}db`
        const userData:User = {
            email: "email-value",
            name: "name-value",
            password: "passsword-value"
        }
        const user = await getUserModel(config)?.create(userData);
        
        expect(user).toBeInstanceOf(Model)
    })
});
