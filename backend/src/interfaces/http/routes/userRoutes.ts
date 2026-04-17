import { Router } from "express";
import { UserController } from "../controllers/UserController";

/**
 * Las rutas NO contienen logica. Solo mapean URLs + metodos HTTP a un metodo
 * del controller. Esto se mantiene limpio y facil de auditar.
 */
export function buildUserRoutes(controller: UserController): Router {
  const router = Router();

  router.get("/", controller.list);
  router.get("/:id", controller.getById);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.remove);

  return router;
}
