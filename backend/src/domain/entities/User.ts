/**
 * DOMAIN LAYER - Entidad User
 * -----------------------------------------------------------------------------
 * La capa de dominio es el nucleo del negocio. No depende de Express, HTTP,
 * bases de datos ni de ninguna libreria externa. Solo describe QUE es un User.
 *
 * Si manana cambias Express por Fastify, o la BD en memoria por Postgres,
 * esta clase NO deberia cambiar.
 */
export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string
  ) {
    this.validate();
  }

  /**
   * Regla de negocio: un User valido debe tener nombre y email con formato.
   * Las reglas del dominio viven aqui, no en el controller.
   */
  private validate(): void {
    if (!this.name || this.name.trim().length < 2) {
      throw new Error("El nombre debe tener al menos 2 caracteres.");
    }
    if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      throw new Error("El email no tiene un formato valido.");
    }
  }
}
