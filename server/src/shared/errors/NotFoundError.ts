export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? "Nenhum registro encontrado");
  }
}
