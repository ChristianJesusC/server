// @ts-check
// Errores compartidos. No conocen HTTP: el status lo decide core/http/errorHandler.js.

export class AppError extends Error {
    /**
     * @param {string} code identificador estable (parte del contrato público)
     * @param {string} message
     * @param {{ cause?: unknown, details?: unknown[] }} [options]
     */
    constructor(code, message, { cause, details } = {}) {
        super(message, { cause });
        this.name = new.target.name;
        this.code = code;
        this.details = details;
    }
}

/** Input mal formado o incompleto. details: [{ field, issue }] */
export class ValidationError extends AppError {
    /** @param {string} message @param {unknown[]} [details] */
    constructor(message, details) {
        super("VALIDATION_ERROR", message, { details });
    }
}

export class AuthenticationError extends AppError { }
export class ForbiddenError extends AppError { }
export class NotFoundError extends AppError { }
export class ConflictError extends AppError { }

/** Falla de una dependencia externa (BD, argon2, JWT). El mensaje real va en `cause`, nunca al cliente. */
export class InfrastructureError extends AppError {
    /** @param {unknown} cause @param {string} [dependency] */
    constructor(cause, dependency = "UNKNOWN") {
        super("INFRASTRUCTURE_ERROR", `Fallo en dependencia: ${dependency}`, { cause });
        this.dependency = dependency;
    }
}
