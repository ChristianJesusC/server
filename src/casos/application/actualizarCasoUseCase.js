// @ts-check
/**
 * @typedef {CasosDomain.Repository} CasoRepository
 * @typedef {CasosDomain.UpdateCaso} UpdateCaso
 */
import { NotFoundError } from "../../../core/errors/appError.js";
import { validateCaso } from "../domain/fields.js";
import { IncompleteCasoError } from "../domain/errors.js";

export default class ActualizarCasoUseCase {
    /**
     * @param {CasoRepository} repository
     * @param {CasoServices.ClienteExistsPort} clienteExists
     */
    constructor(repository, clienteExists) {
        this.repository = repository;
        this.clienteExists = clienteExists;
    }

    /**
     * @param {number} id
     * @param {Partial<UpdateCaso>} caso
     */
    async run(id, caso) {
        const valid = /** @type {UpdateCaso} */ (validateCaso(caso, ["idCliente"]));
        if (!(await this.clienteExists.exists(valid.idCliente))) {
            throw new IncompleteCasoError([{ field: "idCliente", issue: "not_found" }]);
        }
        if (!(await this.repository.updateById(id, valid))) {
            throw new NotFoundError("CASO_NOT_FOUND", "No existe un caso con id " + id, { details: [{ field: "id", issue: "not_found" }] });
        }
    }
}
