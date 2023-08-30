import { Router } from "express";

import { celebrate, Segments, Joi } from "celebrate";
import { messages } from "joi-translation-pt-br";
import { autenticar } from "../../../../shared/middlewares/autenticar";
import { ClientesRepository } from "../prisma/repositories/ClientesRepository";
import { CriarClienteController } from "../../useCases/criarCliente/CriarClienteController";

const clientesRoutes = Router();

const clientesRepository = new ClientesRepository();

const criarClienteController = new CriarClienteController();

clientesRoutes.post(
  "/",
  autenticar,
  celebrate(
    {
      [Segments.BODY]: {
        nome: Joi.string().required(),
        idade: Joi.number().integer().optional(),
        estrangeiro: Joi.boolean().optional(),
      },
    },
    {
      messages: messages,
    }
  ),
  criarClienteController.handle
);

clientesRoutes.get("/", autenticar, async (request, response) => {
  const clientes = await clientesRepository.listar();

  const retorno = {
    clientes,
  };

  return response.json(retorno);
});

/*clientesRoutes.get(
  "/clientes/estrangeiros",
  autenticar,
  async (request, response) => {
    const clientes = await listarClientesEstrangeiros();

    const retorno = {
      clientes,
    };

    return response.json(retorno);
  }
);*/

clientesRoutes.put("/:id", autenticar, async (request, response) => {
  const { id } = request.params;
  const { nome, idade, estrangeiro } = request.body;

  const clienteExiste = await clientesRepository.buscarClientePorId(Number(id));

  if (!clienteExiste) {
    return response.status(400).json({ erro: "Cliente não encontrado!" });
  }

  const cliente = await clientesRepository.alterar({
    id: Number(id),
    nome,
    idade,
    estrangeiro,
  });

  return response.json(cliente);
});

clientesRoutes.delete("/:id", autenticar, async (request, response) => {
  const { id } = request.params;

  const clienteExiste = await clientesRepository.buscarClientePorId(Number(id));

  if (!clienteExiste) {
    return response.status(400).json({ erro: "Cliente não encontrado!" });
  }

  await clientesRepository.remover(Number(id));

  return response.json({ sucesso: "OK" });
});

export { clientesRoutes };
