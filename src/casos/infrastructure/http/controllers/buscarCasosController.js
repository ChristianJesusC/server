// @ts-check
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {HTTP.HTTPController} Controller
 * @typedef {import('../../../application/buscarCasosUseCase.js').default} BuscarCasosUseCase
 */

/**
 * @implements {Controller}
 */
export default class BuscarCasosController {
    /** @param {BuscarCasosUseCase} usecase */
    constructor(usecase) {
        this.usecase = usecase;
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async run(req, res) {
        const casos = await this.usecase.run(req.query.searchBy, req.query.searchTerm);
        res.status(200).send({
            message: "búsqueda realizada exitosamente",
            payload: casos
        });
    }
}
