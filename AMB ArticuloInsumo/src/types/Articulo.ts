export interface Articulo {
    id: number;
    denominacion: string;
    fechaAlta: Date;
    fechaBaja: Date;
    fechaModificacion: Date;
    precioCompra: number;
    stockActual: number;
    stockMinimo: number;
    urlImagen: string;

}