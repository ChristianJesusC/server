// @ts-check
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {HTTP.HTTPController} Controller
 * @typedef {import('../../../application/getAllCasosUseCase.js').GetAllCasosUseCase} GetAllCasosUseCase
 */

/**
 * @implements {Controller}
 */
export default class GetAllCasosController {
    /** @param {GetAllCasosUseCase} usecase */
    constructor(usecase) {
        this.usecase = usecase;
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async run(req, res) {
        const casos = await this.usecase.run();
        res.status(200).send({
            message: "casos obtenidos exitosamente",
            payload: casos
        });
    }
}
