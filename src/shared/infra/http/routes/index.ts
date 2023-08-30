import { Router } from "express";
import { clientesRoutes } from "../../../../modules/clientes/infra/http/clientesRoutes";

const routes = Router();

routes.use("/clientes", clientesRoutes);

export { routes };
