// @ts-check
/**
 * @typedef {CasosDomain.Repository} CasoRepository
 * @typedef {CasosDomain.NewCaso} NewCaso
 */
import { validateCaso } from "../domain/fields.js";
import { IncompleteCasoError } from "../domain/errors.js";

export default class AgregarCasoUseCase {
    /**
     * @param {CasoRepository} repository
     * @param {CasoServices.ClienteExistsPort} clienteExists
     */
    constructor(repository, clienteExists) {
        this.repository = repository;
        this.clienteExists = clienteExists;
    }

    /**
     * @param {Partial<NewCaso>} caso
     * @returns {Promise<number>} idCasos generado
     */
    async run(caso) {
        const valid = /** @type {NewCaso} */ (validateCaso(caso, ["idAbogados", "idCliente"]));
        if (!(await this.clienteExists.exists(valid.idCliente))) {
            throw new IncompleteCasoError([{ field: "idCliente", issue: "not_found" }]);
        }
        return await this.repository.saveNewCaso(valid);
    }
}
