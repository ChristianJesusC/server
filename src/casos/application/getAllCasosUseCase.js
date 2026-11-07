// @ts-check
/** @typedef {CasosDomain.Repository} CasoRepository */

export class GetAllCasosUseCase {
    /** @param {CasoRepository} repository */
    constructor(repository) {
        this.repository = repository;
    }

    async run() {
        return await this.repository.getAllCasos();
    }
}
