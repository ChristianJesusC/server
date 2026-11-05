// @ts-check
import { ValidationError } from "../../../core/errors/appError.js";

export class IncompleteCasoError extends ValidationError {
    /** @param {Array<{ field: string, issue: string }>} details */
    constructor(details) {
        super("Información del caso incompleta o inválida", details);
        this.code = "INCOMPLETE_CASO";
    }
}
