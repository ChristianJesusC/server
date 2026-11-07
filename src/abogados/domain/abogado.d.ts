declare namespace AbogadosDomain {
    type Abogado = {
        idAbogados?: number,
        nombre: string,
        apePat: string,
        apeMat: string,
        correo: string,
        contraseña?: string,
        ocupacion: string
    }

    interface Repository {
        saveNewAbogado(abogado: Required<Omit<Abogado, "idAbogados">>): Promise<void>;
        getAbogadoByEmail(email: string): Promise<Abogado | null>;
        getAbogadoById(id: number): Promise<Abogado | null>;
        /** true si existía y se borró */
        deleteById(id: number): Promise<boolean>;
        getAllAbogados(): Promise<Abogado[]>;
    }
}