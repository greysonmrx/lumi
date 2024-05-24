export class ServiceUnavailableError extends Error {
  constructor(message?: string) {
    super(message ?? "Serviço indisponível no momento");
  }
}
