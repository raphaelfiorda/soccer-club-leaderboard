import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http')
import User from '../database/models/user';
import { loginMock, userLoginMock } from './loginMocks';
import * as bcryptjs from 'bcryptjs';
import jwtService from '../services/jwtService';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a integração da rota de /login', () => {
  describe('Verifica o método login em caso de sucesso', async () => {
    beforeEach(() => {
      Sinon.stub(User, 'findOne').resolves(userLoginMock as User);
      Sinon.stub(bcryptjs, 'compare').resolves(true);
      Sinon.stub(jwtService, 'createToken').returns('token');
    });

    afterEach(() => {
      Sinon.restore();
    })

    it('Retorna status 201', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginMock);

      expect(response.status).to.equal(200);
    });
    
    it('Retorna o token', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(loginMock);

      expect(response.body.token).to.equal('token');
    });
  });
});
