// @ts-check
/**
 * @typedef {ClientesDomain.Repository} ClienteRepository
 * @typedef {ClienteServices.CasosLookupPort} CasosLookupPort
 */
import { ConflictError, NotFoundError } from "../../../core/errors/appError.js";

export class BorrarClienteUseCase {
    /**
     * @param {ClienteRepository} repository
     * @param {CasosLookupPort} casosLookup
     */
    constructor(repository, casosLookup) {
        this.repository = repository;
        this.casosLookup = casosLookup;
    }

    /** @param {number} id */
    async run(id) {
        if (await this.casosLookup.hasCasos(id)) {
            throw new ConflictError("CLIENTE_HAS_CASOS", "El cliente tiene casos asociados y no puede eliminarse", {
                details: [{ field: "id", issue: "has_casos" }]
            });
        }
        if (!(await this.repository.deleteById(id))) {
            throw new NotFoundError("CLIENTE_NOT_FOUND", "No existe un cliente con id " + id, { details: [{ field: "id", issue: "not_found" }] });
        }
    }
}
