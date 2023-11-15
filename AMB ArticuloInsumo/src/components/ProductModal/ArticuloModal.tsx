import { Articulo } from "../../types/Articulo";

import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";

//Dependencias para validar los formularios
import * as Yup from "yup";
import { useFormik } from "formik";

import { ArticuloService } from "../../services/ArticuloService";

//Notificaciones al usuario
import { toast } from 'react-toastify';

//Recibe parametros como props para que se renderice, su titulo y según qué operación queremos realizar.
type ArticuloModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    arti: Articulo;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;

};

const ArticuloModal = ({ show, onHide, title, arti, modalType, refreshData }: ArticuloModalProps) => {

    //CREATE-UPDATE función handleSaveUpdate 
    const handleSaveUpdate = async (arti: Articulo) => {
        try {
            const isNew = arti.id === 0;
            if (isNew) {
                await ArticuloService.createArticulo(arti);
            } else {
                await ArticuloService.updateArticulo(arti.id, arti);
            }
            toast.success(isNew ? "Articulo Creado" : "Articulo Actualizado", {
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
            await ArticuloService.deleteArticulo(arti.id);
            toast.success("Articulo borrado", {
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
            denominacion: Yup.string().required('La Denominacion es requerida'),
            precioCompra: Yup.number().integer().min(0).required(),
            stockActual: Yup.number().integer().min(0).required(),
            stockMinimo: Yup.number().integer().min(0).required(),
            urlImagen: Yup.string().required('La URL es requerida')
        });
    };


    //Formik -  Utiliza el esquema de validación de YUP y obtiene un formulario dinámico que
    // bloquea el formulario en caso de haber errores.
    const formik = useFormik({
        initialValues: arti,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Articulo) => handleSaveUpdate(obj),
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
                            <p> ¿Está seguro que desea eliminar el articulo
                                <br /> <strong> {arti.denominacion} </strong> ?
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

                                {/*"Denominacion"*/}
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


                                {/* {"precioCompra"}*/}
                                <Form.Group controlId="formprecioCompra">
                                    <Form.Label>precio de Compra</Form.Label>
                                    <Form.Control
                                        name="precioCompra"
                                        type="number"
                                        value={formik.values.precioCompra || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.precioCompra &&
                                            formik.touched.precioCompra)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.precioCompra}
                                    </Form.Control.Feedback>
                                </Form.Group>


                                {/*{"stockActual"}*/}
                                <Form.Group controlId="formstockActual">
                                    <Form.Label>stock Actual</Form.Label>
                                    <Form.Control
                                        name="stockActual"
                                        type="number"
                                        value={formik.values.stockActual || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockActual &&
                                            formik.touched.stockActual)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stockActual}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*{"stockMinimo"}*/}
                                <Form.Group controlId="formstockMinimo">
                                    <Form.Label>stock Minimo</Form.Label>
                                    <Form.Control
                                        name="stockMinimo"
                                        type="number"
                                        value={formik.values.stockMinimo || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockMinimo &&
                                            formik.touched.stockMinimo)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stockMinimo}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*"Imagen"*/}
                                <Form.Group controlId="formurlImagen">
                                    <Form.Label>Imagen</Form.Label>
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

export default ArticuloModal;