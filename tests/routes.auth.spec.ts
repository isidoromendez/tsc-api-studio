import { appx as application } from "../src/app";
import config from "../src/config";
import request from "supertest";

describe('Aceptance Routes /auth',() => {
    let app: any;
    let server: any;
    beforeEach(async() => {
        // TODO: initialize database
        app = await application();
        server = app.listen(config.PORT,() => {
            //TODO: inform console.log(`Started on port ${config.PORT}`);
        });
    })

    afterEach(() => {
       server.close((err:any)=>{})
    });

    test.skip('register 200', async() => {
        // prepare
        const exp = {
            statusCode: 200,
            body: {
                name: 'User Name',
                email: 'user@example.com',
                description: 'no description',
            }
        }

        // exec
        const response = await request(app)
            .post('/auth/register')
            .send({
                "name": "User Name",
                "email": "user@example.com",
                "password": "12345"
            })
            .set('content-type', 'application/json')

        // test
        expect(response.statusCode).toBe(exp.statusCode);
        expect(response.body).toMatchObject(exp.body);
    });

    test('login 200', async() => {
        // prepare
        const exp = {
            statusCode: 200,
            body: {
                token:expect.any(String),
                user: expect.objectContaining({
                    name:expect.stringMatching('User Name'),
                    password: expect.any(String),
                    email:expect.stringMatching('user@example.com'),
                    description:expect.stringMatching('no description'),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                })
            }
        }

        // exec
        const response = await request(app)
            .post('/auth/login')
            .send({
                "email": "user@example.com",
                "password": "12345"
            })
            .set('content-type', 'application/json')

        // test
        expect(response.statusCode).toBe(exp.statusCode);
        expect(response.body).toMatchObject(expect.objectContaining(exp.body));
    });


})