import { useEffect, useState } from "react"
import { RubroArticulo } from "../../types/RubroArticulo"
import { RubroArticuloService } from "../../services/RubroArticuloService";

import { Table } from "react-bootstrap";
import Loader from "../Loader/Loader";


import { ModalType } from "../../types/ModalType";

import RubroArticuloModal from "../ProductModal/RubroArticuloModal";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import './BotonesStyle.css'
import '../BotonesRubroArticulos/BotonesStyle.css'

import './TablaRubroArticulo.css';


const TablaRubroArticulos = () => {
    //Variable que va a contener los datos recibidos por la API
    const [rubroArticulos, setRubroArticulos] = useState<RubroArticulo[]>([]);
    const [rubroArticulosLocal, setRubroArticulosLocal] = useState<RubroArticulo[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);

    //Este hook se va a ejecutar cada vez que se renderice el componente o refreshData cambie de estado
    useEffect(() => {
        //Llamamos a la función para obtener todos los RubroArticuloos declarado en el service
        const fetchRubroArticulos = async () => {
            const rubroArticulos = await RubroArticuloService.getRubroArticulos();
            const contenido = rubroArticulos.content;
            setRubroArticulosLocal(contenido);
            setRubroArticulos(contenido);
            setIsLoading(false);
        };
        fetchRubroArticulos();
    }, [refreshData]);

    //Test, este log está modificado para que muestre los datos de una manera más legible
    //console.log(JSON.stringify(RubroArticulos, null, 2));

    //Se inicializa un RubroArticulo vacio cuando vayamos a crear uno nuevo, para evitar "undefined"
    const initializeNewRubroArticulo = (): RubroArticulo => {
        return {
            id: 0,
            denominacion: "",
            fechaAlta: new Date(""),
            fechaBaja: new Date(""),
            fechaModificacion: new Date(""),
        };
    };

    //RubroArticulo seleccionado que se va a pasar como prop al Modal
    const [rubroArticulo, setRubroArticulo] = useState<RubroArticulo>(initializeNewRubroArticulo);

    //Manejo de Modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

    //Logica de Modal
    const handleClick = (newTitle: string, rbat: RubroArticulo, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setRubroArticulo(rbat);
        setShowModal(true);
    };


    const [textoEscrito, setTextoEscrito] = useState('');

    useEffect(() => {
        const resultadoFiltrado = rubroArticulos.filter(
            (rbat) => rbat.denominacion.toLocaleLowerCase().includes(textoEscrito.toLocaleLowerCase()))
        setRubroArticulosLocal(resultadoFiltrado)
    }, [textoEscrito]);

    const handleTextoEscrito = event => {
        setTextoEscrito(event.target.value);
    };

    return (
        <>
            <div className="BotonesRubroArticulos">
                <div id="titulo">
                    <h1>RubroArticulos Registrados</h1>
                </div>
                <div id="botones">
                    <button onClick={() => handleClick("Nuevo Producto",
                        initializeNewRubroArticulo(), ModalType.CREATE)}>
                        Crear nuevo rubroArticulo
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

                    <Table id="tablaRubroArticulos">
                        <thead>
                            <tr>
                                <th> Nombre RubroArticulo </th>
                                <th> Modificar </th>
                                <th> Eliminar </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rubroArticulosLocal.map(rubroArticulo => (
                                <tr key={rubroArticulo.id}>

                                    <td> {rubroArticulo.denominacion } </td>
                                    <td> <EditButton onClick={() => handleClick("Editar RubroArticulo", rubroArticulo, ModalType.UPDATE)} /> </td>
                                    <td> <DeleteButton onClick={() => handleClick("Borrar RubroArticulo", rubroArticulo, ModalType.DELETE)} /> </td>

                                </tr>
                            ))}
                        </tbody>

                    </Table>

                )}

                {showModal && (
                    <RubroArticuloModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        title={title}
                        modalType={modalType}
                        rbat={rubroArticulo}
                        refreshData={setRefreshData}
                    />
                )}


            </div>
        </>
    )
}

export default TablaRubroArticulos;
