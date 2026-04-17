import { randomUUID } from "crypto";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";

export interface CreateUserDTO {
  name: string;
  email: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: CreateUserDTO): Promise<User> {
    // Regla de negocio: no se permite email duplicado
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new Error(`Ya existe un usuario con email ${dto.email}`);
    }

    // La validacion de formato vive en el constructor del dominio
    const user = new User(randomUUID(), dto.name.trim(), dto.email.trim().toLowerCase());
    return this.userRepository.create(user);
  }
}
