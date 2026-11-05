// @ts-check
/**
 * @typedef {import('express').Response} Response
 * @typedef {HTTP.MetaRequest} Request
 * @typedef {HTTP.HTTPController} Controller
 */

import { BorrarAbogadoUseCase } from '../../../application/borrarAbogadoUseCase.js';

/**
 * @implements {Controller}
 */
export class BorrarAbogadoController {
    /**
     * @param {BorrarAbogadoUseCase} borrarAbogadoUseCase 
     */
    constructor(borrarAbogadoUseCase) {
        this.borrarAbogadoUseCase = borrarAbogadoUseCase;
    }

    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    async run(req, res) {
        const userId = /** @type {number} */ (req.meta.user.id);
        await this.borrarAbogadoUseCase.run(userId);
        res.status(200).send({
            message: "lawyer deleted successfully"
        });
    }
}