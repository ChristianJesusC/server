// @ts-check
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {HTTP.HTTPController} Controller
 * @typedef {import('../../../application/agregarClienteUseCase.js').default} UseCase
 */

/**
 * @implements {Controller}
 */
export default class AgregarClienteController {
    /** @param {UseCase} usecase */
    constructor(usecase) {
        this.usecase = usecase;
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async run(req, res) {
        const idCliente = await this.usecase.run(req.body);
        res.status(201).send({
            message: "cliente registrado exitosamente",
            payload: { idCliente }
        });
    }
}
