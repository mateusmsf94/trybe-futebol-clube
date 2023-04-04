import { Router } from 'express';
import validateLogin from '../middlewares/loginValidation';
import LoginService from '../services/LoginService';
import User from '../database/models/UsersModels';
import LoginController from '../controllers/LoginController';
import tokenValidation from '../middlewares/tokenValidaton';

const loginRoutes = Router();
const loginService = new LoginService(User);
const loginController = new LoginController(loginService);

loginRoutes.post('/', validateLogin, loginController.login);
loginRoutes.get('/role', tokenValidation, loginController.role);

export default loginRoutes;
