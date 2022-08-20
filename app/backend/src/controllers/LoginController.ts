import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  public service: LoginService;

  constructor(service: LoginService = new LoginService()) {
    this.service = service;
  }

  login = async (req: Request, res: Response): Promise<Response> => {
    const data = await this.service.validateBody(req.body);
    await this.service.checkUser(data);
    const token: string = await this.service.login(data);

    return res.status(200).json({ token });
  };
}
