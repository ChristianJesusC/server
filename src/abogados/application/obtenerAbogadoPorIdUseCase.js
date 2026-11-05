// @ts-check
/**
 * @typedef {AbogadosDomain.Abogado} Abogado
 * @typedef {AbogadosDomain.Repository} AbogadoRepository
 */

import { NotFoundError } from "../../../core/errors/appError";

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
            throw new NotFoundError("LAWYER_NOT_FOUND", "No lawyer registered with id " + id, {
                //pendiente
            });
        }
        return abogado;
    }
}