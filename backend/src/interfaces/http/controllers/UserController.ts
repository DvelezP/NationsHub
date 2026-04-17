import { Request, Response, NextFunction } from "express";
import { GetUsersUseCase } from "../../../application/use-cases/users/GetUsersUseCase";
import { GetUserByIdUseCase } from "../../../application/use-cases/users/GetUserByIdUseCase";
import { CreateUserUseCase } from "../../../application/use-cases/users/CreateUserUseCase";
import { UpdateUserUseCase } from "../../../application/use-cases/users/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../../application/use-cases/users/DeleteUserUseCase";

/**
 * INTERFACES LAYER - Controller HTTP.
 *
 * El controller es el UNICO que conoce a Express. Extrae datos de req
 * (params, query, body), llama al caso de uso, y responde con res.
 * Cualquier excepcion la delega a next() -> errorHandler.
 */
export class UserController {
  constructor(
    private readonly getUsers: GetUsersUseCase,
    private readonly getUserById: GetUserByIdUseCase,
    private readonly createUser: CreateUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase
  ) {}

  list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.getUsers.execute();
      res.json({ data: users, total: users.length });
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Ejemplo de ROUTE PARAM: /users/:id  -> req.params.id
      const user = await this.getUserById.execute(req.params.id);
      res.json({ data: user });
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Ejemplo de BODY: JSON enviado en POST -> req.body
      const { name, email } = req.body ?? {};
      if (!name || !email) {
        res.status(400).json({ error: "name y email son requeridos" });
        return;
      }
      const user = await this.createUser.execute({ name, email });
      res.status(201).json({ data: user });
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.updateUser.execute(req.params.id, req.body ?? {});
      res.json({ data: user });
    } catch (err) {
      next(err);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.deleteUser.execute(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
