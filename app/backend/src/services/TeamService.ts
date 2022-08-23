import CustomError from '../CustomError';
import Team from '../database/models/team';

export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamService {
  validateParams(id: string): void;
  list(): Promise<ITeam[]>;
  get(id: string): Promise<ITeam | null>;
}

export default class TeamService implements ITeamService {
  validateParams = (id: string): void => {
    if (typeof id !== 'string' || id === undefined) throw new CustomError('Invalid params', 400);
  };

  list = async (): Promise<ITeam[]> => {
    const teams: ITeam[] = await Team.findAll();

    return teams;
  };

  get = async (id: string): Promise<ITeam | null> => {
    const team: ITeam | null = await Team.findOne({
      where: { id },
    });
    if (team === null) throw new CustomError('Team not found', 404);

    return team;
  };
}
