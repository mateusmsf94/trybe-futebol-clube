import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces';

export default function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const body = req.body as ILogin;

  if (!body.email || !body.password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email) || body.password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
}
