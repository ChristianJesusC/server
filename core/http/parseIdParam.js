// @ts-check
import { ValidationError } from "../errors/appError.js";

/**
 * Convierte un parámetro de ruta en id entero > 0.
 * @param {unknown} value
 */
export function parseIdParam(value) {
    const id = Number(value);
    if (!Number.isInteger(id) || id <= 0) {
        throw new ValidationError("id inválido", [{ field: "id", issue: "invalid" }]);
    }
    return id;
}
