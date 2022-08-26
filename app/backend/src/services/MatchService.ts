import Team from '../database/models/team';
import Match from '../database/models/match';
import CustomError from '../CustomError';
import TeamService from './TeamService';

export interface IMatchService {
  list(): Promise<IMatch[]>;
  listFinished(): Promise<IMatch[]>;
}

export interface IMatch {
  id?: number;
  homeTeam?: number;
  homeTeamGoals?: number;
  awayTeam?: number;
  awayTeamGoals?: number;
  inProgress?: boolean;
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

  listFinished = async (): Promise<IMatch[]> => {
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
      where: { inProgress: false },
      order: ['home_team'],
    });

    return matches;
  };

  create = async (matchReq: IMatch): Promise<IMatch> => {
    const { homeTeam, awayTeam } = matchReq;
    if (homeTeam === awayTeam) {
      throw new CustomError('It is not possible to create a match with two equal teams', 401);
    }
    const checkTeamsIds = new TeamService().checkTeams([homeTeam as number, awayTeam as number]);
    if ((await checkTeamsIds).length < 2) {
      throw new CustomError('There is no team with such id!', 404);
    }
    const match = await Match.create({ ...matchReq, inProgress: true });

    return match;
  };

  finish = async (id: string): Promise<void> => {
    await Match.update({ inProgress: false }, { where: { id } });
  };

  update = async (dataToChange: IMatch, id: string): Promise<IMatch> => {
    const matchChanged = await Match.update(dataToChange, {
      where: { id },
    });

    return matchChanged as IMatch;
  };
}
