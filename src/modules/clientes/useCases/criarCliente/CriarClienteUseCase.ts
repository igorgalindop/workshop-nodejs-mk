import { Clientes } from "@prisma/client";
import { ICriarClienteDTO } from "../../dtos/ICriarClienteDTO";
import { injectable, inject } from "tsyringe";
import { IClientesRepository } from "../../repositories/IClientesRepository";

@injectable()
class CriarClienteUseCase {
  constructor(
    @inject("ClientesRepository")
    private clientesRepository: IClientesRepository
  ) {}

  public async execute({
    nome,
    idade,
    estrangeiro,
  }: ICriarClienteDTO): Promise<Clientes | null> {
    const cliente = await this.clientesRepository.criar({
      nome,
      idade,
      estrangeiro,
    });

    return cliente;
  }
}

export { CriarClienteUseCase };
