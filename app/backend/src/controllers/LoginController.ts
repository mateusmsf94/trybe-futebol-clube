import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService: LoginService) {}

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userLogin: ILogin = req.body;
      const { code, message } = await this.loginService.login(userLogin);

      res.status(code).json(code !== 200 ? { message } : { token: message });
    } catch (error) {
      next(error);
    }
  };

  public role = async (req: Request, res: Response): Promise<void> => {
    const user = req.body.data;
    const { data: { role } } = user;
    res.status(200).json({ role });
  };
}
