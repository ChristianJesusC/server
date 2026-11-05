// @ts-check
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {HTTP.HTTPController} Controller
 * @typedef {import('../../../application/obtenerAbogadoPorIdUseCase').default} ObtenerAbogadoPorIdUseCase
 */

import { ValidationError } from '../../../../../core/errors/appError.js';

/**
 * @implements {Controller}
 */
export default class ObtenerAbogadoPorIdController {
    /**
     * @param {ObtenerAbogadoPorIdUseCase} usecase 
     */
    constructor(usecase) {
        this.usecase = usecase;
    }

    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    async run(req, res) {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            throw new ValidationError("id inválido", [{ field: "id", issue: "invalid" }]);
        }
        const abogado = await this.usecase.run(id);
        res.status(200).send({
            message: "lawyer has been fetched successfully",
            payload: abogado
        });
    }
}