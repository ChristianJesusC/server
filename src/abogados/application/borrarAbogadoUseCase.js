// @ts-check

/**
 * @typedef {AbogadosDomain.Repository} AbogadoRepository
 */

export class BorrarAbogadoUseCase {
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
        await this.repository.deleteById(id);
    }
}