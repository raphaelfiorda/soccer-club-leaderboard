import MatchService from './MatchService';
import HomeTeamScore from './utils/HomeTeamScore';
import sortLeaderboard from './utils/sortLeaderboard';
import subArrayGen from './utils/subArrayGen';

export interface ITeamScore {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export interface ILeaderboard {
  listHomeTeams(): Promise<ITeamScore[]>;
}

export default class LeaderboardService implements ILeaderboard {
  listHomeTeams = async (): Promise<ITeamScore[]> => {
    const matchesFinished = await new MatchService().listFinished();
    // A função a seguir retorna as partidas organizadas em sub-arrays por time
    const matchesByTeam = subArrayGen(matchesFinished as [], 'homeTeam');
    const homeTeamLeaderboard: ITeamScore[] = matchesByTeam
      .map((matches) => {
        const { teamHome: { teamName } } = matches[0];
        return new HomeTeamScore(teamName, matches).teamScore;
      });
    const tieBreaker = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
    const sortedLeaderboard: ITeamScore[] = sortLeaderboard(homeTeamLeaderboard as [], tieBreaker);

    return sortedLeaderboard;
  };
}
