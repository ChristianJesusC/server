// @ts-check
/**
 * @typedef {AbogadosDomain.Abogado} Abogado
 * @typedef {AbogadosDomain.Repository} AbogadoRepository
 */

import { NotFoundError } from "../../../core/errors/appError.js";

export default class ObtenerAbogadoPorIdUseCase {
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
        const abogado = await this.repository.getAbogadoById(id);
        if (!abogado) {
            throw new NotFoundError("LAWYER_NOT_FOUND", "No existe un abogado con id " + id, {
                details: [{ field: "id", issue: "not_found" }]
            });
        }
        return abogado;
    }
}