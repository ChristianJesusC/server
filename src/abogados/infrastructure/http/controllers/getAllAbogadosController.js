// @ts-check
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {HTTP.HTTPController} Controller
 * @typedef {import('../../../application/getAllAbogadosUseCase').GetAllAbogadosUseCase} GetAllAbogadosUseCase
 */

/**
 * @implements {Controller}
 */
export default class GetAllAbogadosController {
    /**
     * @param {GetAllAbogadosUseCase} usecase 
     */
    constructor(usecase) {
        this.usecase = usecase;
    }

    /**
     * @param {Request} req 
     * @param {Response} res 
     */
    async run(req, res) {
        const abogados = await this.usecase.run();
        res.status(200).send({
            message: "abogados obtenidos exitosamente",
            payload: abogados
        });
    }
}