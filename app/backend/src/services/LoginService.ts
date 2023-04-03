import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import { ILogin, ILoginService } from '../interfaces';
import Users from '../database/models/UsersModels';
import { createToken } from '../auth/authFunction';

export default class LoginService implements ILoginService {
  private _usersModel: ModelStatic<Users>;

  constructor(usersModel: ModelStatic<Users>) {
    this._usersModel = usersModel;
  }

  public async login(userLogin: ILogin): Promise<{ code: number, message: string }> {
    const user = await this._usersModel.findOne({
      where: {
        email: userLogin.email,
      },
    });

    if (!user) {
      return { message: 'Invalid email or password', code: 401 };
    }

    const isPasswordValid = await bcrypt.compare(userLogin.password, user.password);

    if (!isPasswordValid) {
      return { code: 401, message: 'Invalid email or password' };
    }

    const token = createToken(user);

    return { code: 200, message: token };
  }
}
