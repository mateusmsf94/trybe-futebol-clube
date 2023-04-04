import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../auth/authFunction';

export default function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const payload = verifyToken(authorization);
    req.body.data = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
