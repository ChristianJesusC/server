// @ts-check
/**
 * @typedef {CasosDomain.Repository} CasoRepository
 * @typedef {CasosDomain.UpdateCaso} UpdateCaso
 */
import { NotFoundError } from "../../../core/errors/appError.js";
import { validateCaso } from "../domain/fields.js";

export default class ActualizarCasoUseCase {
    /** @param {CasoRepository} repository */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * @param {number} id
     * @param {Partial<UpdateCaso>} caso
     */
    async run(id, caso) {
        const valid = /** @type {UpdateCaso} */ (validateCaso(caso, ["idCliente"]));
        if (!(await this.repository.updateById(id, valid))) {
            throw new NotFoundError("CASO_NOT_FOUND", "No existe un caso con id " + id, { details: [{ field: "id", issue: "not_found" }] });
        }
    }
}
