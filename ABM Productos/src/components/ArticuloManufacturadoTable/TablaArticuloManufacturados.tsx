import { useEffect, useState } from "react"
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado"
import { ArticuloManufacturadoService } from "../../services/ArticuloManufacturadoService";

import { Table } from "react-bootstrap";
import Loader from "../Loader/Loader";


import { ModalType } from "../../types/ModalType";

import ArticuloManufacturadoModal from "../ProductModal/ArticuloManufacturadoModal";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import './BotonesStyle.css'
import './TablaArticuloManufacturados.css';


const TablaArticuloManufacturados = () => {
    //Variable que va a contener los datos recibidos por la API
    const [articuloManufacturados, setArticuloManufacturados] = useState<ArticuloManufacturado[]>([]);
    const [articuloManufacturadosLocal, setArticuloManufacturadosLocal] = useState<ArticuloManufacturado[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);

    //Este hook se va a ejecutar cada vez que se renderice el componente o refreshData cambie de estado
    useEffect(() => {
        //Llamamos a la función para obtener todos los Empleadoos declarado en el service
        const fetchArticuloManufacturados = async () => {
            const articuloManufacturados = await ArticuloManufacturadoService.getArticuloManufacturados();
            const contenido = articuloManufacturados.content;
            setArticuloManufacturadosLocal(contenido);
            setArticuloManufacturados(contenido);
            setIsLoading(false);
        };
        fetchArticuloManufacturados();
    }, [refreshData]);

    //Test, este log está modificado para que muestre los datos de una manera más legible
    //console.log(JSON.stringify(empleados, null, 2));

    //Se inicializa un Empleado vacio cuando vayamos a crear uno nuevo, para evitar "undefined"
    const initializeNewArticuloManufacturado = (): ArticuloManufacturado => {
        return {
            id: 0,
            denominacion: "",
            descripcion: "",
            tiempoEstimadoCocina: 0,
            precioVenta: 0,
            costo: 0,
            urlImagen: "",
            receta: "",
            // estado: "",
            fechaAlta: new Date(""),
            fechaModificacion: new Date(""),
            fechaBaja: new Date(""),
        };
    };

    //Empleado seleccionado que se va a pasar como prop al Modal
    const [articuloManufacturado, setArticuloManufacturado] = useState<ArticuloManufacturado>(initializeNewArticuloManufacturado);

    //Manejo de Modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

    //Logica de Modal
    const handleClick = (newTitle: string, artManu: ArticuloManufacturado, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setArticuloManufacturado(artManu);
        setShowModal(true);
    };


    const [textoEscrito, setTextoEscrito] = useState('');

    useEffect(() => {
        const resultadoFiltrado = articuloManufacturados.filter(
            (artManu) => artManu.denominacion.toLocaleLowerCase().includes(textoEscrito.toLocaleLowerCase()) ||
                artManu.descripcion.toLocaleLowerCase().includes(textoEscrito.toLocaleLowerCase()) 
        )
        setArticuloManufacturadosLocal(resultadoFiltrado)
    }, [textoEscrito]);

    const handleTextoEscrito = event => {
        setTextoEscrito(event.target.value);
    };

    return (
        <>
            <div className="BotonesArticuloManufacturados">
                <div id="titulo">
                    <h1>Productos Registrados</h1>
                </div>
                <div id="botones">
                    <button onClick={() => handleClick("Nuevo Producto",
                        initializeNewArticuloManufacturado(), ModalType.CREATE)}>
                        Crear nuevo Producto
                    </button>
                    <button>VOLVER</button>
                </div>
                <div id="divbuscador">
                    <input
                        id="inputbuscar"
                        type="search"
                        placeholder="Buscar"
                        aria-label="Buscar"
                        value={textoEscrito}
                        onChange={handleTextoEscrito}
                    />
                    <button onClick={() => setTextoEscrito}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 25 24"
                            fill="none"
                        >
                            <g clip-path="url(#clip0_855_41)">
                                <path
                                    d="M15.8594 14H15.0694L14.7894 13.73C15.7694 12.59 16.3594 11.11 16.3594 9.5C16.3594 5.91 13.4494 3 9.85938 3C6.26938 3 3.35938 5.91 3.35938 9.5C3.35938 13.09 6.26938 16 9.85938 16C11.4694 16 12.9494 15.41 14.0894 14.43L14.3594 14.71V15.5L19.3594 20.49L20.8494 19L15.8594 14ZM9.85938 14C7.36938 14 5.35938 11.99 5.35938 9.5C5.35938 7.01 7.36938 5 9.85938 5C12.3494 5 14.3594 7.01 14.3594 9.5C14.3594 11.99 12.3494 14 9.85938 14Z"
                                    fill="black" fill-opacity="0.75" />
                            </g>
                            <defs>
                                <clipPath id="clip0_855_41">
                                    <rect width="24" height="24" fill="white" transform="translate(0.359375)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="m-3">

                {/* Botón para que cuando el usuario haga click llame a la función que declaramos
            <Button onClick={() => handleClick("Nuevo Producto",
                initializeNewProduct(), ModalType.CREATE)}>
                Nuevo Producto
            </Button> */}

                {isLoading ? <Loader /> : (

                    <Table id="tablaArticuloManufacturados">
                        <thead>
                            <tr>
                                <th> Denominacion </th>
                                <th> Descripcion </th>
                                <th> Tiempo Estimado de Cocina </th>
                                <th> Precio de Venta </th>
                                <th> Costo </th>
                                <th> Url Imagen </th>
                                <th> Receta </th>
                                {/* <th> Estado </th> */}
                                <th> Modificar </th>
                                <th> Eliminar </th>
                            </tr>
                        </thead>
                        <tbody>
                            {articuloManufacturadosLocal.map(articuloManufacturado => (
                                <tr key={articuloManufacturado.id}>

                                    <td> {articuloManufacturado.denominacion} </td>
                                    <td> {articuloManufacturado.descripcion} </td>
                                    <td> {articuloManufacturado.tiempoEstimadoCocina} </td>
                                    <td> {articuloManufacturado.precioVenta} </td>
                                    <td> {articuloManufacturado.costo} </td>
                                    <td> {articuloManufacturado.urlImagen} </td>
                                    <td> {articuloManufacturado.receta} </td>
                                    {/* <td> {articuloManufacturado.estado.toUpperCase()} </td> */}
                                    <td> <EditButton onClick={() => handleClick("Editar Articulo Manufacturado", articuloManufacturado, ModalType.UPDATE)} /> </td>
                                    <td> <DeleteButton onClick={() => handleClick("Borrar Articulo Manufacturado", articuloManufacturado, ModalType.DELETE)} /> </td>
                               
                                </tr>
                            ))}
                        </tbody>

                    </Table>

                )}

                {showModal && (
                    <ArticuloManufacturadoModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        title={title}
                        modalType={modalType}
                        artManu={articuloManufacturado}
                        refreshData={setRefreshData}
                    />
                )}


            </div>
        </>
    )
}

export default TablaArticuloManufacturados;
