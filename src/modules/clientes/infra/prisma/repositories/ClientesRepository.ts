import { Clientes, PrismaClient } from "@prisma/client";
import { ICriarClienteDTO } from "../../../dtos/ICriarClienteDTO";
import { IClientesRepository } from "../../../repositories/IClientesRepository";

class ClientesRepository implements IClientesRepository {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async buscarClientePorId(id: number): Promise<Clientes | null> {
    const cliente = await this.prisma.clientes.findUnique({
      where: {
        id,
      },
    });

    return cliente;
  }

  async criar({
    nome,
    idade,
    estrangeiro,
  }: ICriarClienteDTO): Promise<Clientes | null> {
    const cliente = await this.prisma.clientes.create({
      data: {
        nome,
        idade,
        estrangeiro,
      },
    });

    return cliente;
  }

  async listar(): Promise<Clientes[] | null> {
    const clientes = await this.prisma.clientes.findMany();

    return clientes;
  }

  async remover(id: number): Promise<void> {
    await this.prisma.clientes.delete({
      where: {
        id,
      },
    });
  }

  async alterar({ id, nome, idade, estrangeiro }: Clientes): Promise<Clientes> {
    const cliente = await this.prisma.clientes.update({
      where: {
        id,
      },
      data: {
        nome,
        idade,
        estrangeiro,
      },
    });

    return cliente;
  }
}

export { ClientesRepository };
