-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "idade" INTEGER,
    "estrangeiro" BOOLEAN,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendas" (
    "id" SERIAL NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Vendas_pkey" PRIMARY KEY ("id")
);
