export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginService {
  login(userLogin:ILogin): Promise<{ code: number, message: string }>;
}

export interface ILoginController {
  login(req: Request, res: Response): Promise<void | Response>;
  getRole(req: Request, res: Response): Promise<void>;
}

export interface ILeaderboard {
  name: string;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  totalGames: number;
  totalPoints: number;
  goalsFavor: number;
  goalsOwn: number;
  efficiency: number;
  goalsBalance: number;
}

export interface ILeaderboardService {
  getAll(): Promise<ILeaderboard[]>;
  getHome(): Promise<ILeaderboard[]>;
  getAway(): Promise<ILeaderboard[]>;
}

export interface IMatch {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface ITeam {
  id: number;
  teamName: string;
}
