import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  public service: LeaderboardService;

  constructor(service: LeaderboardService = new LeaderboardService()) {
    this.service = service;
  }

  listHomeTeams = async (_req: Request, res: Response): Promise<Response> => {
    const homeTeamLeaderboard = await this.service.listHomeTeams();

    return res.status(200).json(homeTeamLeaderboard);
  };
}
