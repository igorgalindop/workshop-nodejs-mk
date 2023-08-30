import { Clientes } from "@prisma/client";
import { ICriarClienteDTO } from "../dtos/ICriarClienteDTO";

interface IClientesRepository {
  criar({
    nome,
    idade,
    estrangeiro,
  }: ICriarClienteDTO): Promise<Clientes | null>;
  listar(): Promise<Clientes[] | null>;
  remover(id: number): Promise<void>;
  alterar({ id, nome, idade, estrangeiro }: Clientes): Promise<Clientes>;
  buscarClientePorId(id: number): Promise<Clientes | null>;
}

export { IClientesRepository };
