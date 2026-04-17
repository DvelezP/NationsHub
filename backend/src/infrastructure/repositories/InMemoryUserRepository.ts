import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

/**
 * INFRASTRUCTURE LAYER - Repositorio en memoria.
 * Simula una base de datos con un Map. Se cumple el contrato IUserRepository,
 * por lo que los casos de uso no notan la diferencia con una BD real.
 *
 * Cuando migres a Postgres/Mongo, creas OtroRepository que implemente la misma
 * interfaz y solo cambias el "cableado" en interfaces/http/app.ts.
 */
export class InMemoryUserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();

  constructor(seed: User[] = []) {
    seed.forEach((u) => this.users.set(u.id, u));
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const target = email.toLowerCase();
    for (const u of this.users.values()) {
      if (u.email === target) return u;
    }
    return null;
  }

  async create(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async update(
    id: string,
    data: Partial<Pick<User, "name" | "email">>
  ): Promise<User | null> {
    const existing = this.users.get(id);
    if (!existing) return null;

    // Re-instanciamos para que corran las validaciones del dominio
    const updated = new User(
      existing.id,
      data.name ?? existing.name,
      data.email ?? existing.email
    );
    this.users.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.users.delete(id);
  }
}
