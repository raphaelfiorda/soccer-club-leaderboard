import { NextFunction, Request, Response } from 'express';
import jwtService from '../services/jwtService';
import LoginService, { ILoginBody } from '../services/LoginService';

export default class LoginController {
  public service: LoginService;

  constructor(service: LoginService = new LoginService()) {
    this.service = service;
  }

  validateToken = (req: Request, _res: Response, next: NextFunction): void => {
    const { authorization } = req.headers;

    jwtService.validateToken(authorization);

    next();
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const data = await this.service.validateBody(req.body);
    await this.service.checkUser(data);
    const token: string = await this.service.login(data);

    return res.status(200).json({ token });
  };

  get = async (req: Request, res: Response): Promise<Response> => {
    const { authorization } = req.headers;
    jwtService.validateToken(authorization as string);
    const { data } = jwtService.decodeToken(authorization as string);
    const userRole = await this.service.get(data as ILoginBody);

    return res.status(200).json(userRole);
  };
}
