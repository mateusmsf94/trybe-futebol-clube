import * as jwt from 'jsonwebtoken';
import User from '../database/models/UsersModels';

const secret:string = process.env.JWT_SECRET || 'naruto';

const createToken = (data:User) =>
  jwt.sign({ data }, secret, {
    algorithm: 'HS256',
    expiresIn: '5d',
  });

const verifyToken = (token:string) => jwt.verify(token, secret);

export { createToken, verifyToken };
