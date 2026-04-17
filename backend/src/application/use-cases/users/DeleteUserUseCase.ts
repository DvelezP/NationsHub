import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    const ok = await this.userRepository.delete(id);
    if (!ok) {
      throw new Error(`Usuario con id ${id} no encontrado`);
    }
  }
}
