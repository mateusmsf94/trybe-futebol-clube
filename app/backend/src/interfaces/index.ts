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
