import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http')
import Team from '../database/models/team';
import { teamMock } from './teamMocks';
import * as bcryptjs from 'bcryptjs';
import jwtService from '../services/jwtService';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a integração da rota /teams', () => {
  afterEach(() => Sinon.restore());

  describe('Verifica a camada de listagem', async () => {
    afterEach(() => Sinon.restore());

    it('Retorna o status 200 e o response correto', async () => {
      Sinon.stub(Team, 'findAll').resolves(teamMock as Team[])
      const response = await chai.request(app)
        .get('/teams');

      const { status, body } = response;

      expect(status).to.equal(200);
      expect(JSON.stringify(body))
        .to.equal(JSON.stringify(teamMock))
    });
  });

  describe('Verifica a funcionalidade get', async () => {
    afterEach(() => Sinon.restore());

    it('Retorna o status 200 e o response correto', async () => {
      Sinon.stub(Team, 'findOne').resolves(teamMock[0] as Team);
      const response = await chai.request(app)
        .get('/teams/1')

      const { status, body } = response;

      expect(status).to.equal(200);
      expect(JSON.stringify(body))
        .to.equal(JSON.stringify(teamMock[0]));
    });

    it('Retorna um erro 404 caso o time não seja encontrado', async () => {
      Sinon.stub(Team, 'findOne').resolves(null);
      const response = await chai.request(app)
        .get('/teams/1');

      const { status, body: { message } } = response;

      expect(status).to.equal(404);
      expect(message).to.equal('Team not found');
    });
  });
})