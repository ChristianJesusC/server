// @ts-check
/** @typedef {CasosDomain.Repository} CasoRepository */
import { IncompleteCasoError } from "../domain/errors.js";

export default class BuscarCasosUseCase {
    /** @param {CasoRepository} repository */
    constructor(repository) {
        this.repository = repository;
    }

    /**
     * @param {unknown} searchBy "codigo" | "titulo"
     * @param {unknown} searchTerm
     */
    async run(searchBy, searchTerm) {
        if (typeof searchTerm !== "string" || searchTerm === "") return await this.repository.getAllCasos();
        if (searchBy !== "codigo" && searchBy !== "titulo") {
            throw new IncompleteCasoError([{ field: "searchBy", issue: "invalid" }]);
        }
        return await this.repository.searchCasos(searchBy, searchTerm);
    }
}
