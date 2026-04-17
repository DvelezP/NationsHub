import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";

/**
 * APPLICATION LAYER - Caso de uso: listar usuarios.
 * Orquesta el dominio. No sabe nada de HTTP, req, res ni Express.
 */
export class GetUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
