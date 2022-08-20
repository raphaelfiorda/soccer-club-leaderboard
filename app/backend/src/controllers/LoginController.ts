import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  public service: LoginService;

  constructor(service: LoginService = new LoginService()) {
    this.service = service;
  }

  login = (req: Request, res: Response): Response => {
    const data = this.service.validateBody(req.body);
    const token: string = this.service.login(data);

    return res.status(200).json({ token });
  };
}
