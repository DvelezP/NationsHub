import { User } from "../entities/User";

/**
 * Contrato (interfaz) que DEBE cumplir cualquier implementacion que quiera
 * persistir usuarios: in-memory, Postgres, Mongo, Redis, etc.
 *
 * Los casos de uso dependen de esta abstraccion, no de una implementacion
 * concreta (principio de inversion de dependencias - la D de SOLID).
 */
export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: string, data: Partial<Pick<User, "name" | "email">>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
