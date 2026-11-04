/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * @interface
 */
export class RequestController {
    /**
     * @param {Request} req 
     * @param {Response} res 
     * @returns {Promise<void>}
     */
    async run(req, res) { }
}