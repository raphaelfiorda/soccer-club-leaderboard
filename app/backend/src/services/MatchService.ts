import Team from '../database/models/team';
import Match from '../database/models/match';

export interface IMatchService {
  list(): Promise<IMatch[]>;
}

export interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export default class MatchService implements IMatchService {
  list = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });

    return matches;
  };
}
