// import User from '../database/models/user';
import CustomError from '../CustomError';
import jwtService from './jwtService';

export interface ILoginBody {
  email: string,
  password: string,
}

export interface ILoginService {
  validateBody(body: ILoginBody): ILoginBody,
  login(data: ILoginBody): string,
}

export default class LoginService implements ILoginService {
  validateBody = (body: ILoginBody): ILoginBody => {
    const { email, password } = body;
    if (!email || !password) throw new CustomError('All fields must be filled', 400);

    return body;
  };

  login = (data: ILoginBody): string => {
    const token = jwtService.createToken(data);

    return token;
  };
}
