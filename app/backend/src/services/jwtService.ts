import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import CustomError from '../CustomError';

dotenv.config();

const secret = process.env.JWT_SECRET as jwt.Secret;

const jwtService = {
  createToken: (data: { email: string, password: string }) => {
    const token = jwt.sign({ data }, secret);

    return token;
  },

  decodeToken: (token: string): jwt.JwtPayload => {
    const data = jwt.decode(token, { json: true }) as jwt.JwtPayload;

    return data;
  },

  validateToken: (token: string) => {
    if (!token) throw new CustomError('Token not found', 401);

    try {
      return jwt.verify(token, secret);
    } catch (err) {
      throw new CustomError('Expired ou invalid token', 403);
    }
  },
};

export default jwtService;
