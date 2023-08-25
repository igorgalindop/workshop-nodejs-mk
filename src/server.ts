import express, { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { celebrate, Segments, Joi, errors } from "celebrate";
import { messages } from "joi-translation-pt-br";
import { PrismaClient, Clientes } from "@prisma/client";

const app = express();

const prisma = new PrismaClient();

interface ICliente {
  id: string;
  nome: string;
  idade: number;
  estrangeiro: boolean;
}

interface ICriarClienteDTO {
  nome: string;
  idade?: number;
  estrangeiro?: boolean;
}

const clientes: ICliente[] = [];

app.use(express.json());

function autenticar(request: Request, response: Response, next: NextFunction) {
  const { token } = request.headers;

  if (token !== "123456") {
    return response.status(401).json({ erro: "Não autorizado!" });
  }

  next();
}

async function criarCliente({ nome, idade, estrangeiro }: ICriarClienteDTO) {
  const cliente = await prisma.clientes.create({
    data: {
      nome,
      idade,
      estrangeiro,
    },
  });

  return cliente;
}

async function listarClientes() {
  const clientes = await prisma.clientes.findMany();

  return clientes;
}

async function listarClientesEstrangeiros() {
  const clientes =
    await prisma.$queryRaw`SELECT * FROM clientes WHERE estrangeiro = true`;

  return clientes;
}

async function buscarClientePorId(id: number) {
  const cliente = await prisma.clientes.findUnique({
    where: {
      id,
    },
  });

  return cliente;
}

async function alterarCliente({ id, nome, idade, estrangeiro }: Clientes) {
  const cliente = await prisma.clientes.update({
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

async function deletarCliente(id: number) {
  await prisma.clientes.delete({
    where: {
      id,
    },
  });
}

app.post(
  "/clientes",
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
  async (request, response) => {
    const { nome, idade, estrangeiro } = request.body;

    const cliente = await criarCliente({
      nome,
      idade,
      estrangeiro,
    });

    return response.json(cliente);
  }
);

app.get("/clientes", autenticar, async (request, response) => {
  const clientes = await listarClientes();

  const retorno = {
    clientes,
  };

  return response.json(retorno);
});

app.get("/clientes/estrangeiros", autenticar, async (request, response) => {
  const clientes = await listarClientesEstrangeiros();

  const retorno = {
    clientes,
  };

  return response.json(retorno);
});

app.put("/clientes/:id", autenticar, async (request, response) => {
  const { id } = request.params;
  const { nome, idade, estrangeiro } = request.body;

  const clienteExiste = await buscarClientePorId(Number(id));

  if (!clienteExiste) {
    return response.status(400).json({ erro: "Cliente não encontrado!" });
  }

  const cliente = await alterarCliente({
    id: Number(id),
    nome,
    idade,
    estrangeiro,
  });

  return response.json(cliente);
});

app.delete("/clientes/:id", autenticar, async (request, response) => {
  const { id } = request.params;

  const clienteExiste = await buscarClientePorId(Number(id));

  if (!clienteExiste) {
    return response.status(400).json({ erro: "Cliente não encontrado!" });
  }

  await deletarCliente(Number(id));

  return response.json({ sucesso: "OK" });
});

app.listen(3333, () => {
  console.log("Servidor executado!");
});

app.use(errors());
