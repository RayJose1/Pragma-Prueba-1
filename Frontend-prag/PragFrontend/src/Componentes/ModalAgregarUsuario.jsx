
import { Modal } from "react-bootstrap"; 
import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import { CrearUsuario } from "../Service/CrearUsuario";
import { ModificarUsuario } from "../Service/ModificarUsuario";
import { Formik, Form } from "formik";
import DatePickerField from "./Datepicker";
import InputTextField from "./InputTextField";
import validations from "../Utils/Validation";


const ModalAgregarUsuario = (props) => {
    const { isCrear, renderizar, persona, ...rest } = props
    const formikRef = useRef();
    const [initialValues, setInitialValues] = useState({
        nombre: '',
        rut: '',
        correo: '',
        fechaNacimiento: ''
    })

    async function postCrearPersona(values) {
        console.log(values)
        const valores = {
            nombre: values.nombre,
            rut: values.rut,
            correo: values.correo,
            fechaNacimiento: values.fechaNacimiento
        }
        const resp = await CrearUsuario(valores);
        if (resp) {
            if (resp.status === 200) {
                rest.onHide();
                renderizar();
            }
        }
    }

    async function postActualizarPersona(values) {
        values.id = persona.id;
        const resp = await ModificarUsuario(values);
        if (resp) {
            if (resp.status === 200) {
                rest.onHide();
                renderizar();
            }
        }
    }

    useEffect(() => {
        if (!isCrear) {
            setInitialValues({
                nombre: persona.nombre,
                rut: persona.rut,
                correo: persona.correo,
                fechaNacimiento: persona.fechaNacimiento
            })
        } else {
            setInitialValues({
                nombre: '',
                rut: '',
                correo: '',
                fechaNacimiento: ''
            })
        }
    }, [isCrear, rest.show])

    console.log(formikRef)
    return (
        <Modal
            {...rest}
            size="md"
            aria-labelledby="contained-modal-title-"
            centered
        >
            <Modal.Header >
                {isCrear ?
                    <h6>Nuevo Usuario</h6>
                    :
                    <h6>Modificar Usuario</h6>
                }
            </Modal.Header>
            <Modal.Body>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validate={validations}
                    innerRef={formikRef}
                    onSubmit={values => {
                        if (isCrear) {
                            const envioForm = {
                                rut: values.rut,
                                nombre: values.nombre,
                                correo: values.correo === '' ? null : values.correo,
                                fechaNacimiento: values.fechaNacimiento
                            }
                            postCrearPersona(envioForm);
                        } else {
                            const envioFormActualizar = {
                                usuarioId: persona.id,
                                rut: values.rut,
                                nombre: values.nombre, 
                                correo: values.correo,
                                fechaNacimiento: values.fechaNacimiento
                            }
                            postActualizarPersona(envioFormActualizar);                       
                        }
                    }}
                >
                    {() => (
                        <Form className="form mb-0">
                            <InputTextField
                                name="nombre"
                                type="text"
                                label="Nombre"
                                placeholder="Nombre"
                                autoComplete="true"
                            />
                            <InputTextField
                                name="rut"
                                type="text"
                                label="Rut"
                                placeholder="RUT"
                                autoComplete="true"
                                maxLength="20"
                            />
                            <InputTextField
                                name="correo"
                                type="text"
                                label="Correo"
                                placeholder="Email"
                                autoComplete="true"
                            />
                            <DatePickerField
                                label="Fecha de nacimiento"
                                name="fechaNacimiento"
                                initialValues={initialValues}
                            />
                            <Modal.Footer>
                                <Button type="submit" design="btn-primary btn-sm active">{isCrear ? "Crear" : "Modificar"}</Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
                {/* </div> */}
            </Modal.Body>
        </Modal>
    )
}
export default ModalAgregarUsuario;
