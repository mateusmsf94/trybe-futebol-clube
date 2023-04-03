import { Router } from 'express';
import validateLogin from '../middlewares/loginValidation';
import LoginService from '../services/LoginService';
import User from '../database/models/UsersModels';
import LoginController from '../controllers/LoginController';

const loginRoutes = Router();
const loginService = new LoginService(User);
const loginController = new LoginController(loginService);

loginRoutes.post('/', validateLogin, loginController.login);

export default loginRoutes;
