import { NextFunction, Request, Response } from "express";

function autenticar(request: Request, response: Response, next: NextFunction) {
  const { token } = request.headers;

  if (token !== "123456") {
    return response.status(401).json({ erro: "Não autorizado!" });
  }

  next();
}

export { autenticar };
