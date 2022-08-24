import { Request, Response } from 'express';
import jwtService from '../services/jwtService';
import MatchService from '../services/MatchService';

export default class MatchController {
  public service: MatchService;

  constructor(service: MatchService = new MatchService()) {
    this.service = service;
  }

  list = async (_req: Request, res: Response): Promise<Response> => {
    const matches = await this.service.list();

    return res.status(200).json(matches);
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = req.body;
    const { authorization } = req.headers;
    jwtService.validateToken(authorization);
    const matchCreated = await this.service
      .create({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals });

    return res.status(201).json(matchCreated);
  };

  finish = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { authorization } = req.headers;
    jwtService.validateToken(authorization);
    await this.service.finish(id);

    return res.status(200).json({ message: 'Finished' });
  };
}
