import request from 'supertest';
import { insertDbItem, updateDbItem } from '../src/services/item.service';
import { verifyToken } from '../src/utils/jwt.handle';
import { appx as application } from '../src/app';
import config from '../src/config';

jest.mock('../src/services/item.service');
jest.mock('../src/utils/jwt.handle');

/**
 * Set the token validation
 * @param validate if !true then the token will not validate
 */
const tokenValid = (validate:boolean) => {
  if (!validate) {
    (verifyToken as jest.MockedFunction<typeof verifyToken>)
      .mockReturnValue('');
  }

  (verifyToken as jest.MockedFunction<typeof verifyToken>)
    .mockReturnValue(JSON.stringify(JSON.stringify({
      email: 'user@example.com',
      iat: 1670083201,
      exp: 1670090401,
    })));
};
describe('Aceptance Routes /item', () => {
  let app: any;
  let server: any;
  beforeEach(async () => {
    // TODO: initialize database
    app = await application();
    server = app.listen(config.PORT, () => {
      // TODO: inform console.log(`Started on port ${config.PORT}`);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    server.close();
  });

  test('POST /item 200', async () => {
    // prepare
    const exp = {
      statusCode: 200,
      body: {
        data: {
          id: 'id-value-recived',
          name: 'name-value-recived',
          gas: 'gas-value-recived',
        },
      },
    };
    const sendBody = {
      name: 'name-value-sended',
      gas: 'gas-value-sended',
    };

    tokenValid(true);
    (insertDbItem as jest.MockedFunction<typeof insertDbItem>)
      .mockReturnValue(Promise.resolve(exp.body.data));

    // exec
    const response = await request(app)
      .post('/item')
      .send(sendBody)
      .set('content-type', 'application/json');

    // test
    expect(response.statusCode).toBe(exp.statusCode);
    expect(response.body).toMatchObject(exp.body);
  });

  test('PUT /item 200', async () => {
    // prepare
    const exp = {
      statusCode: 200,
      body: {
        data: {
          id: 'id-value-recived',
          name: 'name-value-recived',
          gas: 'gas-value-recived',
        },
      },
    };
    const sendBody = {
      name: 'name-value-sended',
      gas: 'gase-value-sended',
    };
    const sendId = 'id-value-sended'

    tokenValid(true);
    const updateDbItemMocked = 
      (updateDbItem as jest.MockedFunction<typeof updateDbItem>);
    updateDbItemMocked
      .mockReturnValue(Promise.resolve(exp.body.data));

    // exec
    const response = await request(app)
      .put(`/item/${sendId}`)
      .send(sendBody)
      .set('content-type', 'application/json');

    // test
    expect(updateDbItemMocked).toBeCalledTimes(1);
    expect(updateDbItemMocked).toBeCalledWith(sendId,sendBody)
    expect(response.statusCode).toBe(exp.statusCode);
    expect(response.body).toMatchObject(exp.body);
  });
});
