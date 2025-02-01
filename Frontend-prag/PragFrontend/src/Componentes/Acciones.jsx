import Button from "./Button";
import ModalAgregarUsuario from "./ModalAgregarUsuario";
import { useState } from "react";
import ModalEliminarUsuario from "./ModalEliminarUsuario";

const Acciones = (props) => {
    console.log('props', props)
    const [show, setShow] = useState(false);
    const [showPersona, setShowPersona] = useState(false);
    const handleClose = () => setShow(false);
    const handleClosePersona = () => setShowPersona(false);
    return (
        <>
            <div className="d-flex justify-content-start align-items-center p-0">
                <Button design={"btn-primary"} onClick={() =>  setShowPersona(true)}>
                    Editar
                </Button>
                <Button onClick={() =>setShow(true)}>
                    Eliminar
                </Button>
            </div>

            <ModalEliminarUsuario
                show={show}
                onHide={handleClose}
                persona={props.persona}
                renderizar={props.renderizar}
            />
           
            <ModalAgregarUsuario
                show={showPersona}
                onHide={handleClosePersona}
                isCrear={false}
                persona={props.persona}
                renderizar={props.renderizar}
            />

        </>
    )
}
export default Acciones;