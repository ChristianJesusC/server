// @ts-check
import { ValidationError } from "../../../core/errors/appError.js";

export class IncompleteClienteError extends ValidationError {
    /** @param {string[]} fields */
    constructor(fields) {
        super("Información del cliente incompleta", fields.map((field) => ({ field, issue: "required" })));
        this.code = "INCOMPLETE_CLIENTE";
    }
}
