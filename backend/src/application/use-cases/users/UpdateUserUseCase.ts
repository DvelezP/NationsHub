import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";

export interface UpdateUserDTO {
  name?: string;
  email?: string;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, dto: UpdateUserDTO): Promise<User> {
    const existing = await this.userRepository.findById(id);
    if (!existing) {
      throw new Error(`Usuario con id ${id} no encontrado`);
    }

    // Si cambia el email, validar que no este en uso por otro usuario
    if (dto.email && dto.email.toLowerCase() !== existing.email) {
      const dup = await this.userRepository.findByEmail(dto.email.toLowerCase());
      if (dup && dup.id !== id) {
        throw new Error(`El email ${dto.email} ya esta en uso`);
      }
    }

    const updated = await this.userRepository.update(id, {
      name: dto.name?.trim(),
      email: dto.email?.trim().toLowerCase(),
    });

    if (!updated) {
      throw new Error(`No se pudo actualizar el usuario ${id}`);
    }
    return updated;
  }
}
