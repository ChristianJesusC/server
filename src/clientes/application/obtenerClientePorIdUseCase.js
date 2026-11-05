// @ts-check
/** @typedef {ClientesDomain.Repository} ClienteRepository */
import { NotFoundError } from "../../../core/errors/appError.js";

export default class ObtenerClientePorIdUseCase {
    /** @param {ClienteRepository} repository */
    constructor(repository) {
        this.repository = repository;
    }

    /** @param {number} id */
    async run(id) {
        const cliente = await this.repository.getClienteById(id);
        if (!cliente) {
            throw new NotFoundError("CLIENTE_NOT_FOUND", "No existe un cliente con id " + id, { details: [{ field: "id", issue: "not_found" }] });
        }
        return cliente;
    }
}
