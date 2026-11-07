// @ts-check
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {HTTP.HTTPController} Controller
 * @typedef {import('../../../application/borrarCasoUseCase.js').BorrarCasoUseCase} BorrarCasoUseCase
 */
import { parseIdParam } from "../../../../../core/http/parseIdParam.js";

/**
 * @implements {Controller}
 */
export default class BorrarCasoController {
    /** @param {BorrarCasoUseCase} usecase */
    constructor(usecase) {
        this.usecase = usecase;
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    async run(req, res) {
        await this.usecase.run(parseIdParam(req.params.id));
        res.status(200).send({
            message: "caso eliminado exitosamente"
        });
    }
}
