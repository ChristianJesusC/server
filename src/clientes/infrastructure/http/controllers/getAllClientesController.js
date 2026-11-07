// @ts-check
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {HTTP.HTTPController} Controller
 * @typedef {import('../../../application/getAllClientesUseCase.js').GetAllClientesUseCase} UseCase
 */

/**
 * @implements {Controller}
 */
export default class GetAllClientesController {
    /** @param {UseCase} usecase */
    constructor(usecase) {
        this.usecase = usecase;
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async run(req, res) {
        const clientes = await this.usecase.run();
        res.status(200).send({
            message: "clientes obtenidos exitosamente",
            payload: clientes
        });
    }
}
