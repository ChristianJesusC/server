/**
 * @interface
 */
export class PasswordService {
    /**
     * @param {string} password
     * @returns {Promise<string>} 
     */
    generateSafePassword(password) { }

    /**
     * @param {string} password 
     * @param {string} storedPassword
     * @returns {Promise<boolean>}
     */
    checkPassword(password, storedPassword){}
}