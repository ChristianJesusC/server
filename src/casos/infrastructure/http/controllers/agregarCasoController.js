// @ts-check
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {HTTP.HTTPController} Controller
 * @typedef {import('../../../application/agregarCasoUseCase.js').default} AgregarCasoUseCase
 */

/**
 * @implements {Controller}
 */
export default class AgregarCasoController {
    /** @param {AgregarCasoUseCase} usecase */
    constructor(usecase) {
        this.usecase = usecase;
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async run(req, res) {
        const idCasos = await this.usecase.run(req.body);
        res.status(201).send({
            message: "caso registrado exitosamente",
            payload: { idCasos }
        });
    }
}
