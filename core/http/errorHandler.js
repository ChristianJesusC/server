// @ts-check
import {
    AppError, ValidationError, AuthenticationError, ForbiddenError,
    NotFoundError, ConflictError, InfrastructureError
} from "../errors/appError.js";

/** Única tabla clase -> status HTTP. */
const STATUS_BY_CLASS = /** @type {Array<[Function, number]>} */ ([
    [ValidationError, 400],
    [AuthenticationError, 401],
    [ForbiddenError, 403],
    [NotFoundError, 404],
    [ConflictError, 409],
    [InfrastructureError, 503],
]);

/**
 * Middleware de errores de Express (debe registrarse al final).
 * @type {import('express').ErrorRequestHandler}
 */
export function errorHandler(err, req, res, next) {
    if (res.headersSent) return next(err);

    // body JSON roto en express.json()
    if (err?.type === "entity.parse.failed") {
        err = new ValidationError("El cuerpo de la petición no es JSON válido");
    }

    if (err instanceof AppError) {
        const status = STATUS_BY_CLASS.find(([cls]) => err instanceof cls)?.[1] ?? 500;
        if (status >= 500) console.error(err, err.cause);
        // 5xx: mensaje genérico, el detalle real solo va al log
        const message = status >= 500 ? "Error interno del servidor" : err.message;
        return res.status(status).send({ error: { code: err.code, message, details: err.details ?? [] } });
    }

    console.error(err);
    res.status(500).send({
        error: { code: "INTERNAL_ERROR", message: "Error interno del servidor", details: [] }
    });
}
