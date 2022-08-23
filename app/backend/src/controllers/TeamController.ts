import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  public service: TeamService;

  constructor(service: TeamService = new TeamService()) {
    this.service = service;
  }

  list = async (_req: Request, res: Response): Promise<Response> => {
    const teams = await this.service.list();

    return res.status(200).json(teams);
  };

  get = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    this.service.validateParams(id);
    const team = await this.service.get(id);

    return res.status(200).json(team);
  };
}
