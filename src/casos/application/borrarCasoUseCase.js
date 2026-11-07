// @ts-check
/** @typedef {CasosDomain.Repository} CasoRepository */
import { NotFoundError } from "../../../core/errors/appError.js";

export class BorrarCasoUseCase {
    /** @param {CasoRepository} repository */
    constructor(repository) {
        this.repository = repository;
    }

    /** @param {number} id */
    async run(id) {
        if (!(await this.repository.deleteById(id))) {
            throw new NotFoundError("CASO_NOT_FOUND", "No existe un caso con id " + id, { details: [{ field: "id", issue: "not_found" }] });
        }
    }
}
