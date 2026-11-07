// @ts-check
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {HTTP.HTTPController} Controller
 * @typedef {import('../../../application/obtenerClientePorIdUseCase.js').default} UseCase
 */
import { parseIdParam } from "../../../../../core/http/parseIdParam.js";

/**
 * @implements {Controller}
 */
export default class ObtenerClientePorIdController {
    /** @param {UseCase} usecase */
    constructor(usecase) {
        this.usecase = usecase;
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async run(req, res) {
        const cliente = await this.usecase.run(parseIdParam(req.params.id));
        res.status(200).send({
            message: "cliente obtenido exitosamente",
            payload: cliente
        });
    }
}
