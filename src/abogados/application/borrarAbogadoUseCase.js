// @ts-check

/**
 * @typedef {AbogadosDomain.Repository} AbogadoRepository
 */

import { NotFoundError } from "../../../core/errors/appError.js";

export class BorrarAbogadoUseCase {
    /**
     * @param {AbogadoRepository} repository 
     */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * @param {number} id 
     */
    async run(id) {
        if (!(await this.repository.deleteById(id))) {
            throw new NotFoundError("LAWYER_NOT_FOUND", "No existe un abogado con id " + id, { details: [{ field: "id", issue: "not_found" }] });
        }
    }
}