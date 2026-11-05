// @ts-check
/**
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {import('express').Request & HTTP.MetaRequest<any>} Request
 * @typedef {Services.Token.UserInfo} UserInfo
 * @typedef {Services.Token.TokenService} TokenService
 */

/**
 * @implements {HTTP.HTTPMiddleware}
 */
export class AuthMiddleware {
    /**
     * @param {TokenService} tokenservice 
     */
    constructor(tokenservice) {
        this.tokenservice = tokenservice;
    }

    /**
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     */
    async run(req, res, next) {
        const rawtoken = req.headers.authorization;
        if (!rawtoken || rawtoken === "") {
            res.status(401).send({
                message: "no auth token was recieved"
            });
            return;
        }
        const parsedToken = await this.tokenservice.verifyToken(rawtoken);
        if (!parsedToken.valid) {
            res.status(401).send({
                message: "invalid auth token"
            });
            return;
        }
        const user = /** @type {UserInfo} */ (parsedToken.payload);
        req.meta.user.id = user.id;
        req.meta.user.email = user.email;
        next();
    }
}