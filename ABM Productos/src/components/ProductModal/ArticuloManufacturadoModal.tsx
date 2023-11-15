import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";

import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";

//Dependencias para validar los formularios
import * as Yup from "yup";
import { useFormik } from "formik";

import { ArticuloManufacturadoService } from "../../services/ArticuloManufacturadoService";

//Notificaciones al usuario
import { toast } from 'react-toastify';

//Recibe parametros como props para que se renderice, su titulo y según qué operación queremos realizar.
type ArticuloManufacturadoModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    artManu: ArticuloManufacturado;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;

};

const EmpleadoModal = ({ show, onHide, title, artManu, modalType, refreshData }: ArticuloManufacturadoModalProps) => {

    //CREATE-UPDATE función handleSaveUpdate 
    const handleSaveUpdate = async (artManu: ArticuloManufacturado) => {
        try {
            const isNew = artManu.id === 0;
            if (isNew) {
                await ArticuloManufacturadoService.createArticuloManufacturado(artManu);
            } else {
                await ArticuloManufacturadoService.updateArticuloManufacturado(artManu.id, artManu);
            }
            toast.success(isNew ? "Producto Creado" : "Producto Actualizado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un error');
        }

    };


    //Función handleDelete (DELETE)
    const handleDelete = async () => {
        try {
            await ArticuloManufacturadoService.deleteArticuloManufacturado(artManu.id);
            toast.success("Producto borrado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error("Ha ocurrido un error");

        }

    }
    //YUP - Esquema de validación
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            denominacion: Yup.string().required('La denominacion es requerido'),
            descripcion: Yup.string().required('La descripcion es requerido'),
            tiempoEstimadoCocina: Yup.number().min(0).required('El tiempo de cocina es requerido'),
            precioVenta: Yup.number().required('El precio de venta es requerido'),
            costo: Yup.string().required('El costo es requerido'),
            urlImagen: Yup.string().required('La url es requerida'),
            receta: Yup.string().required('La receta es requerida'),
            // estado: Yup.string().required('El estado es requerida'),
        });
    };


    //Formik -  Utiliza el esquema de validación de YUP y obtiene un formulario dinámico que
    // bloquea el formulario en caso de haber errores.
    const formik = useFormik({
        initialValues: artManu,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: ArticuloManufacturado) => handleSaveUpdate(obj),
    });



    return (
        <>

            {modalType === ModalType.DELETE ? (
                <>

                    <Modal show={show} onHide={onHide} centered backdrop="static">

                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p> ¿Está seguro que desea eliminar el Articulo
                                <br /> <strong> {artManu.denominacion} </strong> ?
                            </p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>
                                Cancelar
                            </Button>

                            <Button variant="danger" onClick={handleDelete}>
                                Borrar
                            </Button>
                        </Modal.Footer>

                    </Modal>
                </>
            ) : (

                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">

                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                        {"Formulario"}
                            <Form onSubmit={formik.handleSubmit}>

                                {/* {"Denominacion"}*/}
                                <Form.Group controlId="formDenominacion">
                                    <Form.Label>Denominacion</Form.Label>
                                    <Form.Control
                                        name="denominacion"
                                        type="text"
                                        value={formik.values.denominacion || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.denominacion &&
                                            formik.touched.denominacion)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.denominacion}
                                    </Form.Control.Feedback>
                                </Form.Group>


                                {/* {"Descripcion"}*/}
                                <Form.Group controlId="formDescripcion">
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control
                                        name="descripcion"
                                        type="text"
                                        value={formik.values.descripcion || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.descripcion &&
                                            formik.touched.descripcion)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.descripcion}
                                    </Form.Control.Feedback>
                                </Form.Group>


                                {/*{"TiempoEstimadoCocina"}*/}
                                <Form.Group controlId="formTiempoEstimadoCocina">
                                    <Form.Label>TiempoEstimadoCocina</Form.Label>
                                    <Form.Control
                                        name="tiempoEstimadoCocina"
                                        type="number"
                                        value={formik.values.tiempoEstimadoCocina || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.tiempoEstimadoCocina &&
                                            formik.touched.tiempoEstimadoCocina)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.tiempoEstimadoCocina}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*{"PrecioVenta"}*/}
                                <Form.Group controlId="formPrecioVenta">
                                    <Form.Label>PrecioVenta</Form.Label>
                                    <Form.Control
                                        name="precioVenta"
                                        type="number"
                                        value={formik.values.precioVenta || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.precioVenta &&
                                            formik.touched.precioVenta)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.precioVenta}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*{"Costo"}*/}
                                <Form.Group controlId="formCosto">
                                    <Form.Label>Costo</Form.Label>
                                    <Form.Control
                                        name="costo"
                                        type="number"
                                        value={formik.values.costo || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.costo &&
                                            formik.touched.costo)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.costo}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*{"UrlImagen"}*/}
                                <Form.Group controlId="formUrlImagen">
                                    <Form.Label>UrlImagen</Form.Label>
                                    <Form.Control
                                        name="urlImagen"
                                        type="text"
                                        value={formik.values.urlImagen || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.urlImagen &&
                                            formik.touched.urlImagen)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.urlImagen}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*{"Receta"}*/}
                                <Form.Group controlId="formReceta">
                                    <Form.Label>Receta</Form.Label>
                                    <Form.Control
                                        name="receta"
                                        type="text"
                                        value={formik.values.receta || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.receta &&
                                            formik.touched.receta)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.receta}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* <Form.Group controlId="formEstado">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select
                                        name="estado"
                                        value={formik.values.estado || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.estado && formik.touched.estado)}
                                    >
                                        <option value="">Selecciona un estado</option>
                                        <option value="alta">Alta</option>
                                        <option value="baja">Baja</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.estado}
                                    </Form.Control.Feedback>
                                </Form.Group> */}
                                <Modal.Footer className="mt-4">

                                    <Button variant="secondary" onClick={onHide}>
                                        Cancelar
                                    </Button>
                                    <Button variant="primary" type="submit" disabled={!formik.isValid}>
                                        Guardar
                                    </Button>

                                </Modal.Footer>
                            </Form>


                        </Modal.Body>

                    </Modal>

                </>
            )}
        </>
    )

}

export default EmpleadoModal;