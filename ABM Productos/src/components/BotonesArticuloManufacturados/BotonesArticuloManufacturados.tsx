import './BotonesStyle.css'

import { ArticuloManufacturado } from '../../types/ArticuloManufacturado';
import { useState } from 'react';
import { ModalType } from '../../types/ModalType';
import ArticuloManufacturadoModal from '../ProductModal/ArticuloManufacturadoModal';
import actualizarTabla from '../ArticuloManufacturadoTable/TablaArticuloManufacturados'

const BotonesArticuloManufacturados = () => {
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
            fechaAlta: new Date(""),
            fechaModificacion: new Date(""),
            fechaBaja: new Date("")
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

    return (
        <>
            <div className="BotonesArticuloManufacturados">
                <h1>Articulo Manufacturados Registrados</h1>
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
                    />
                    <button>
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

            {showModal && (
                <ArticuloManufacturadoModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={title}
                    modalType={modalType}
                    artManu={articuloManufacturado}
                    refreshData={actualizarTabla}
                />
            )}
        </>

    )
}


export default BotonesArticuloManufacturados;
