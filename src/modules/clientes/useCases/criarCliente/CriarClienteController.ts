import { Request, Response } from "express";
import { container } from "tsyringe";
import { CriarClienteUseCase } from "./CriarClienteUseCase";

class CriarClienteController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { nome, idade, estrangeiro } = request.body;

    const criarClienteUseCase = container.resolve(CriarClienteUseCase);

    const cliente = await criarClienteUseCase.execute({
      nome,
      idade,
      estrangeiro,
    });

    return response.json(cliente);
  }
}

export { CriarClienteController };
