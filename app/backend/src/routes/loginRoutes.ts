import { Router, Request, Response } from 'express';

const loginRoutes = Router();

loginRoutes.post('/', (req: Request, res: Response) => {
  // Your route handling logic here
  res.status(200).send('success');
});

export default loginRoutes;
