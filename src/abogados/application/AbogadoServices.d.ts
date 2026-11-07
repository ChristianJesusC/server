declare namespace AbogadoServices {
    interface PasswordService {
        generateSafePassword(password: string): Promise<string>;
        checkPassword(password: string, storedPassword: string): Promise<boolean>;
    }
}