import * as sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import User from '../database/models/user';
import { loginMock } from './loginMocks';
// import { IUser } from '../../interfaces/IUser';
// import { jwtService } from '../../services/jwtService;
// import { passwordService } from '../../services/passwordService;
//

import { app } from '../app';

chai.use(chaiHttp);

describe('Testa a camada service de /user', () => {
  describe('Verifica o método create', () => {
    const response = await chai.request(app)
      .post('/login')
      .send(loginMock)

    expect(response.status).to.equal(201);
  });
});
