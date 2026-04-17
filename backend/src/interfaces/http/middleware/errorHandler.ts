import { Request, Response, NextFunction } from "express";

/**
 * Middleware global de errores. Traduce errores del dominio/casos de uso a
 * respuestas HTTP. Los controllers hacen throw/next(err) y aqui decidimos
 * el status code.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  const message = err.message || "Error interno del servidor";

  // Mapeo simple de mensajes -> status HTTP
  if (/no encontrado/i.test(message)) {
    res.status(404).json({ error: message });
    return;
  }
  if (/ya existe|ya esta en uso|formato valido|al menos/i.test(message)) {
    res.status(400).json({ error: message });
    return;
  }

  console.error("[ERROR]", err);
  res.status(500).json({ error: message });
}

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ error: "Endpoint no encontrado" });
}
