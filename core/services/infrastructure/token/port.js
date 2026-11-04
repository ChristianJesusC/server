/**
 * @interface
 * @template T
 */
export class TokenService {
    /**
     * @param {T} payload
     * @returns {Promise<string>} 
     */
    generateToken(payload) { }

    /**
     * @param {string} token
     * @returns {Promise<{ valid: boolean, payload: T? }>} 
     */
    verifyToken(token){}
}