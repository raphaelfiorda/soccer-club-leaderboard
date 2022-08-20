import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  public service: LoginService;

  constructor(service: LoginService = new LoginService()) {
    this.service = service;
  }

  login = (req: Request, res: Response): Response => {
    const { email, password } = this.service.validateBody(req.body);
    const token: string = this.service.login(email, password);

    return res.status(201).json({ token });
  };
}
