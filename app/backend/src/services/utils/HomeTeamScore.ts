import { IMatch } from '../MatchService';

export interface ITeamMatch extends IMatch {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default class HomeTeamScore {
  private _name: string;
  private _totalPoints: number;
  private _totalGames: number;
  private _totalVictories: number;
  private _totalDraws: number;
  private _totalLosses: number;
  private _goalsFavor: number;
  private _goalsOwn: number;
  private _goalsBalance: number;
  private _efficiency: string;

  constructor(name: string, teamMatches: ITeamMatch[]) {
    this._name = name;
    this._totalPoints = HomeTeamScore.gameScore(teamMatches).totalPoints();
    this._totalGames = teamMatches.length;
    this._totalVictories = HomeTeamScore.gameScore(teamMatches).v;
    this._totalDraws = HomeTeamScore.gameScore(teamMatches).e;
    this._totalLosses = HomeTeamScore.gameScore(teamMatches).d;
    this._goalsFavor = teamMatches.reduce((acc, el) => acc + el.homeTeamGoals, 0);
    this._goalsOwn = teamMatches.reduce((acc, el) => acc + el.awayTeamGoals, 0);
    this._goalsBalance = (this._goalsFavor - this._goalsOwn);
    this._efficiency = (
      (this._totalPoints / (this._totalGames * 3)) * 100
    ).toFixed(2);
  }

  static gameScore(teamMatches: ITeamMatch[]) {
    const gameScore = { v: 0, e: 0, d: 0 };
    teamMatches.forEach((match) => {
      const { homeTeamGoals: HG, awayTeamGoals: AG } = match;
      switch (true) {
        case HG > AG: gameScore.v += 1; break;
        case HG < AG: gameScore.d += 1; break;
        default: gameScore.e += 1;
      }
    });

    const totalPoints = () => {
      const { v, e } = gameScore;
      return ((v * 3) + e);
    };

    return { ...gameScore, totalPoints };
  }

  get teamScore() {
    return {
      name: this._name,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this._efficiency,
    };
  }
}
