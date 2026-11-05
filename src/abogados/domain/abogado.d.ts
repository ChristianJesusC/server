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
        saveNewAbogado(abogado: Required<Abogado>): Promise<void>;
        getAbogadoByEmail(email: string): Promise<Abogado | null>;
        getAbogadoById(id: number): Promise<Abogado | null>;
        deleteById(id: number): Promise<void>;
        getAllAbogados(): Promise<Required<Abogado>[]>;
    }
}