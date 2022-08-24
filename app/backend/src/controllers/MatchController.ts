import { Request, Response } from 'express';
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
}
