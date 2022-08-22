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
  describe('Verifica o caso de sucesso', async () => {
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

  describe('Verifica caso de falha na validação da requisição', async() => {
    it('Retorna o status e mensagem de erro', async () => {
      const errorResponse = await chai.request(app)
        .post('/login')
        .send('');

      const { status, body: { message } } = errorResponse;

      expect(status).to.equal(400);
      expect(message).to.equal('All fields must be filled');
    });
  });

  describe('Verifica caso o usuário não seja cadastrado ou os dados são inválidos', async() => {
    beforeEach(() => {
      Sinon.stub(User, 'findOne').resolves(null);
      Sinon.stub(bcryptjs, 'compare').resolves(false);
    });

    afterEach(() => {
      Sinon.restore();
    })

    it('Retorna o status e mensagem de erro', async () => {
      const errorResponse = await chai.request(app)
        .post('/login')
        .send(loginMock);

      const { status, body: { message } } = errorResponse;

      expect(status).to.equal(401);
      expect(message).to.equal('Incorrect email or password');
    });
  });
});
