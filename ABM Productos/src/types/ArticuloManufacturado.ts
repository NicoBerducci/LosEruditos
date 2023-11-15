export interface ArticuloManufacturado {
    id: number;
    denominacion: string;
    descripcion: string;
    tiempoEstimadoCocina: number;
    precioVenta: number;
    costo: number;
    urlImagen: string;
    receta: string;
    //estado: string;
    fechaAlta: Date;
    fechaModificacion: Date;
    fechaBaja: Date;
}