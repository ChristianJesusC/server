// @ts-check
import { AuthenticationError, ConflictError, ValidationError } from "../../../core/errors/appError.js";

export class InvalidCredentialsError extends AuthenticationError {
    constructor() {
        super("INVALID_CREDENTIALS", "Correo o contraseña incorrectos");
    }
}

export class EmailAlreadyRegisteredError extends ConflictError {
    /** @param {unknown} [cause] */
    constructor(cause) {
        super("LAWYER_EMAIL_TAKEN", "Ya existe un abogado con ese correo", { cause });
    }
}

export class IncompleteLawyerError extends ValidationError {
    /** @param {string[]} fields */
    constructor(fields) {
        super("Información del abogado incompleta", fields.map((field) => ({ field, issue: "required" })));
        this.code = "INCOMPLETE_LAWYER";
    }
}
