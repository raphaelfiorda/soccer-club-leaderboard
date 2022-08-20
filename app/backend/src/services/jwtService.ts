import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET as jwt.Secret;

const jwtService = {
  createToken: (data: { email: string, password: string }) => {
    const token = jwt.sign({ data }, secret);

    return token;
  },
};

export default jwtService;
