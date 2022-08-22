import * as bcryptjs from 'bcryptjs';
import User from '../database/models/user';
import CustomError from '../CustomError';
import jwtService from './jwtService';

export interface ILoginBody {
  email: string,
  password: string,
}

export interface ILoginService {
  validateBody(body: ILoginBody): Promise<ILoginBody>,
  login(data: ILoginBody): Promise<string>,
  checkUser(data: ILoginBody): void;
}

export default class LoginService implements ILoginService {
  validateBody = async (body: ILoginBody): Promise<ILoginBody> => {
    const { email, password } = body;
    if (!email || !password) throw new CustomError('All fields must be filled', 400);

    return body;
  };

  checkUser = async (body: ILoginBody): Promise<boolean> => {
    const { email, password } = body;
    const user = await User.findOne({
      attributes: ['email', 'password'],
      where: { email },
    });
    const passwordHash = user?.password || '';
    const hasPasswordMatch = await bcryptjs.compare(password, passwordHash);
    if (!user || !hasPasswordMatch) throw new CustomError('Incorrect email or password', 401);

    return true;
  };

  login = async (data: ILoginBody): Promise<string> => {
    const token = jwtService.createToken(data);

    return token;
  };
}
