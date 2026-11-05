// @ts-check
import { IncompleteCasoError } from "./errors.js";

/** Columnas opcionales del caso (texto, nullable en BD). */
const OPTIONAL_FIELDS = [
    "Subtitulo", "TipoJuicio", "EstadoExpediente", "PrimerLugar", "PrimeraFecha", "SegundoLugar",
    "SegundaFecha", "Descripcion", "fechaRegistro", "PrimeraFirma", "SegundaFirma", "TerceraFirma", "CuartaFirma"
];

/**
 * Valida Titulo + ids y normaliza opcionales a string|null.
 * @param {Record<string, any>} input
 * @param {string[]} idFields campos que deben ser enteros > 0
 * @returns {Record<string, any>}
 */
export function validateCaso(input, idFields) {
    /** @type {Array<{ field: string, issue: string }>} */
    const details = [];
    if (typeof input?.Titulo !== "string" || input.Titulo.trim() === "") details.push({ field: "Titulo", issue: "required" });
    for (const f of idFields) {
        if (!Number.isInteger(input?.[f]) || input[f] <= 0) details.push({ field: f, issue: "required" });
    }
    if (details.length) throw new IncompleteCasoError(details);

    /** @type {Record<string, any>} */
    const out = { Titulo: input.Titulo.trim() };
    for (const f of idFields) out[f] = input[f];
    for (const f of OPTIONAL_FIELDS) out[f] = typeof input[f] === "string" ? input[f] : null;
    return out;
}
