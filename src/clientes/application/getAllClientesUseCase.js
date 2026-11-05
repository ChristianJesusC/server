// @ts-check
/** @typedef {ClientesDomain.Repository} ClienteRepository */

export class GetAllClientesUseCase {
    /** @param {ClienteRepository} repository */
    constructor(repository) {
        this.repository = repository;
    }

    async run() {
        return await this.repository.getAllClientes();
    }
}
