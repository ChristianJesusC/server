// @ts-check
/**
 * @typedef {CasosDomain.Repository} CasoRepository
 * @typedef {CasosDomain.NewCaso} NewCaso
 */
import { validateCaso } from "../domain/fields.js";

export default class AgregarCasoUseCase {
    /** @param {CasoRepository} repository */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * @param {Partial<NewCaso>} caso
     * @returns {Promise<number>} idCasos generado
     */
    async run(caso) {
        const valid = /** @type {NewCaso} */ (validateCaso(caso, ["idAbogados", "idCliente"]));
        return await this.repository.saveNewCaso(valid);
    }
}
