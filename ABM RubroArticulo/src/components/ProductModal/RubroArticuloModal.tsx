import { RubroArticulo } from "../../types/RubroArticulo";

import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";

//Dependencias para validar los formularios
import * as Yup from "yup";
import { useFormik } from "formik";

import { RubroArticuloService } from "../../services/RubroArticuloService";

//Notificaciones al usuario
import { toast } from 'react-toastify';

//Recibe parametros como props para que se renderice, su titulo y según qué operación queremos realizar.
type RubroArticuloModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    rbat: RubroArticulo;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
    
};

const RubroArticuloModal = ({show, onHide, title, rbat, modalType, refreshData}:RubroArticuloModalProps) => {

    //CREATE-UPDATE función handleSaveUpdate 
    const handleSaveUpdate = async (rbat: RubroArticulo) => {
    try {
        const isNew = rbat.id === 0;
        if (isNew) {
            await RubroArticuloService.createRubroArticulo(rbat);
        } else {
            await RubroArticuloService.updateRubroArticulo(rbat.id, rbat);
        }
        toast.success(isNew ? "RubroArticulo Creado" : "RubroArticulo Actualizado", {
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
        await RubroArticuloService.deleteRubroArticulo(rbat.id);
        toast.success("RubroArticulo borrado", {
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
        denominacion: Yup.string().required('El denominacion es requerido'),
        });
    };
    

//Formik -  Utiliza el esquema de validación de YUP y obtiene un formulario dinámico que
// bloquea el formulario en caso de haber errores.
    const formik = useFormik({
        initialValues: rbat,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: RubroArticulo) => handleSaveUpdate(obj),
     });



        return(
            <>

            {modalType === ModalType.DELETE ? (
                <>

                <Modal show={show} onHide={onHide} centered backdrop="static">

                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p> ¿Está seguro que desea eliminar al rubroArticulo 
                        <br /> <strong> {rbat.denominacion} </strong> ?
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
                        
                    {/*"denominacion"*/}
                        <Form.Group controlId="formdenominacion">
                            <Form.Label>denominacion</Form.Label>
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

export default RubroArticuloModal;