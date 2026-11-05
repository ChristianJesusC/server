// @ts-check
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {HTTP.HTTPController} Controller
 * @typedef {import('../../../application/obtenerAbogadoPorIdUseCase').default} ObtenerAbogadoPorIdUseCase
 */

import { ValidationError } from '../../../../../core/errors/appError';

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
        const id = parseInt(/** @type {string} */ (req.params.id));
        if (!id) {
            throw new ValidationError("no id was recieved", ["id"]);
        }
        const abogado = await this.usecase.run(id);
        res.status(200).send({
            message: "lawyer has been fetched successfully",
            payload: abogado
        });
    }
}