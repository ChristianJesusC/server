// @ts-check
import jwt from "jsonwebtoken";

/**
 * @template T
 * @typedef {import('./port.js').TokenService<T>} TokenService
 */

const jwt_secret = /** @type {String} */ (process.env.JWT_SECRET);

/**
 * @implements {TokenService<Object>}
 */
export class TokenServiceImpl {
    /**
     * @param {Object} payload
     */
    async generateToken(payload) {
        const token = jwt.sign(payload, jwt_secret, {
            expiresIn: "1h"
        });
        return token;
    }

    /**
     * @param {string} token 
     */
    async verifyToken(token) {
        try {
            const payload = jwt.verify(token, jwt_secret);
            
            return {
                valid: true,
                payload: /** @type {Object} */ (payload)
            };
        } catch (error) {
            return { 
                valid: false, 
                payload: null 
            };
        }
    }
}