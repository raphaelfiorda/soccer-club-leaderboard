import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const { message, status = 500 } = err;
  if (message) res.status(status).json({ message });

  console.log(message);
};

export default errorHandler;
