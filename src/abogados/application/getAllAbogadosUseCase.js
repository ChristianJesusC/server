// @ts-check

/**
 * @typedef {AbogadosDomain.Repository} AbogadoRepository
 */

export class GetAllAbogadosUseCase {
    /**
     * @param {AbogadoRepository} repository
     */
    constructor(repository) {
        this.repository = repository;
    }

    async run() {
        return await this.repository.getAllAbogados();
    }
}