import { useEffect, useState } from "react"
import { Articulo } from "../../types/Articulo"
import { ArticuloService } from "../../services/ArticuloService";

import { Table } from "react-bootstrap";
import Loader from "../Loader/Loader";


import { ModalType } from "../../types/ModalType";

import ArticuloModal from "../ProductModal/ArticuloModal";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import './BotonesStyle.css'
import './TablaArticulo.css';


const TablaArticulos = () => {
    //Variable que va a contener los datos recibidos por la API
    const [Articulos, setArticulos] = useState<Articulo[]>([]);
    const [ArticulosLocal, setArticulosLocal] = useState<Articulo[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);

    //Este hook se va a ejecutar cada vez que se renderice el componente o refreshData cambie de estado
    useEffect(() => {
        //Llamamos a la función para obtener todos los Articuloos declarado en el service
        const fetchArticulos = async () => {
            const Articulos = await ArticuloService.getArticulos();
            const contenido = Articulos.content;
            setArticulosLocal(contenido);
            setArticulos(contenido);
            setIsLoading(false);
        };
        fetchArticulos();
    }, [refreshData]);

    //Test, este log está modificado para que muestre los datos de una manera más legible
    //console.log(JSON.stringify(Articulos, null, 2));

    //Se inicializa un Articulo vacio cuando vayamos a crear uno nuevo, para evitar "undefined"
    const initializeNewArticulo = (): Articulo => {
        return {
            id: 0,
            denominacion: "",
            fechaAlta: new Date(""),
            fechaBaja: new Date(""),
            fechaModificacion: new Date(""),
            precioCompra: 0,
            stockActual: 0,
            stockMinimo: 0,
            urlImagen: "",

        };
    };

    //Articulo seleccionado que se va a pasar como prop al Modal
    const [Articulo, setArticulo] = useState<Articulo>(initializeNewArticulo);

    //Manejo de Modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

    //Logica de Modal
    const handleClick = (newTitle: string, arti: Articulo, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setArticulo(arti);
        setShowModal(true);
    };


    const [textoEscrito, setTextoEscrito] = useState('');

    useEffect(() => {
        const resultadoFiltrado = Articulos.filter(
            (arti) => arti.denominacion.toLocaleLowerCase().includes(textoEscrito.toLocaleLowerCase())

        )
        setArticulosLocal(resultadoFiltrado)
    }, [textoEscrito]);

    const handleTextoEscrito = event => {
        setTextoEscrito(event.target.value);
    };

    return (
        <>
            <div className="BotonesArticulos">
                <div id="titulo">
                    <h1>Articulos Registrados</h1>
                </div>
                <div id="botones">
                    <button onClick={() => handleClick("Nuevo Producto",
                        initializeNewArticulo(), ModalType.CREATE)}>
                        Crear nuevo Articulo
                    </button>
                    
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

                    <Table id="tablaArticulos">
                        <thead>
                            <tr>
                                <th> Denominacion </th>
                                <th> precio de Compra </th>
                                <th> stock Actual </th>
                                <th> stock Minimo </th>
                                <th> Imagen </th>
                                <th> Modificar </th>
                                <th> Eliminar </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ArticulosLocal.map(Articulo => (
                                <tr key={Articulo.id}>

                                    <td> {Articulo.denominacion} </td>
                                    <td> {Articulo.precioCompra} </td>
                                    <td> {Articulo.stockActual} </td>
                                    <td> {Articulo.stockMinimo} </td>
                                    <td> <img id = "img" src={Articulo.urlImagen} alt="Imagen"/> </td>
                                    <td> <EditButton onClick={() => handleClick("Editar Articulo", Articulo, ModalType.UPDATE)} /> </td>
                                    <td> <DeleteButton onClick={() => handleClick("Borrar Articulo", Articulo, ModalType.DELETE)} /> </td>

                                </tr>
                            ))}
                        </tbody>

                    </Table>

                )}

                {showModal && (
                    <ArticuloModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        title={title}
                        modalType={modalType}
                        arti={Articulo}
                        refreshData={setRefreshData}
                    />
                )}


            </div>
        </>
    )
}

export default TablaArticulos;
