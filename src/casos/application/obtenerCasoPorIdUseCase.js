// @ts-check
/** @typedef {CasosDomain.Repository} CasoRepository */
import { NotFoundError } from "../../../core/errors/appError.js";

export default class ObtenerCasoPorIdUseCase {
    /** @param {CasoRepository} repository */
    constructor(repository) {
        this.repository = repository;
    }

    /** @param {number} id */
    async run(id) {
        const caso = await this.repository.getCasoById(id);
        if (!caso) {
            throw new NotFoundError("CASO_NOT_FOUND", "No existe un caso con id " + id, { details: [{ field: "id", issue: "not_found" }] });
        }
        return caso;
    }
}
