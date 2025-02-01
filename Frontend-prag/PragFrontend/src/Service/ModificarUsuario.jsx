import axios from "axios";


const ModificarUsuario = async (values) => {
    try {
        const resultado = await axios.post("https://localhost:7022/api/Usuario/Modificar",
            {
            idUsuario: values.usuarioId,
            rut: values.rut,
            nombre: values.nombre,
            correo: values.correo,
            fechaNacimiento: values.fechaNacimiento
        },
        {headers: {"Content-Type": "application/json"}}
     );

        return resultado

    } catch (error) {

        console.log(error);

    }

}

export { ModificarUsuario };