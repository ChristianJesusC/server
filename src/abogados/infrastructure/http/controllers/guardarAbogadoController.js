//@ts-check
/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import('../../../../../core/http/controller.js').RequestController} Controller
 */

import GuardarAbogadoUseCase from "../../../application/guardarAbogadoUseCase.js";

/**
 * @implements {Controller}
 */
export default class GuardarAbogadoController {
    /**
     * @param {GuardarAbogadoUseCase} usecase
     */
    constructor(usecase) {
        this.usecase = usecase;
    }

    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    async run(req, res) {
        const abogado = req.body;
        await this.usecase.run(abogado);
        res.status(201).send({
            message: "nuevo abogado creado y guardado exitosamente"
        });
    }
}