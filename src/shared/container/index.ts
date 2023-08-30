import { container } from "tsyringe";
import { IClientesRepository } from "../../modules/clientes/repositories/IClientesRepository";
import { ClientesRepository } from "../../modules/clientes/infra/prisma/repositories/ClientesRepository";

container.registerSingleton<IClientesRepository>(
  "ClientesRepository",
  ClientesRepository
);
