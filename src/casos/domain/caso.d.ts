declare namespace CasosDomain {
    type Caso = {
        idCasos: number,
        Titulo: string,
        Subtitulo: string | null,
        TipoJuicio: string | null,
        EstadoExpediente: string | null,
        PrimerLugar: string | null,
        PrimeraFecha: string | null,
        SegundoLugar: string | null,
        SegundaFecha: string | null,
        Descripcion: string | null,
        idAbogados: number,
        idCliente: number,
        fechaRegistro: string | null,
        PrimeraFirma: string | null,
        SegundaFirma: string | null,
        TerceraFirma: string | null,
        CuartaFirma: string | null
    }

    type NewCaso = Omit<Caso, "idCasos">;
    /** idAbogados no es modificable una vez creado el caso. */
    type UpdateCaso = Omit<NewCaso, "idAbogados">;
    type SearchBy = "codigo" | "titulo";

    interface Repository {
        /** @returns el idCasos generado */
        saveNewCaso(caso: NewCaso): Promise<number>;
        getCasoById(id: number): Promise<Caso | null>;
        getAllCasos(): Promise<Caso[]>;
        searchCasos(by: SearchBy, term: string): Promise<Caso[]>;
        /** true si existía y se actualizó */
        updateById(id: number, caso: UpdateCaso): Promise<boolean>;
        /** true si existía y se borró */
        deleteById(id: number): Promise<boolean>;
    }
}
